"use client";

import { ChangeEventHandler, FC } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { LoginSearchParams } from "@/models/auth";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import CodeSubmit from "./code-submit";

interface LoginFormProps {
  searchParams: LoginSearchParams;
}

const schema = z.object({
  code: z.string().length(4, "Введите код"),
});

const LoginForm: FC<LoginFormProps> = (props) => {
  const { searchParams } = props;

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: { code: "" },
    reValidateMode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const onSubmit = form.handleSubmit(async (values) => {
    console.log("values", values);
  });

  const handleCodeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value.trim();
    form.setValue("code", value);
    if (value.length === 4) e.target.form?.requestSubmit();
  };

  const handleCodeSubmit = (): void => {
    console.log("submit code again");
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <p className="max-w-xs mb-4 text-center">
          {searchParams.phone
            ? `Введите код из СМС, отправленный на номер ${searchParams.phone}`
            : "Введите код из СМС, отправленный на ваш номер"}
        </p>
        <FormField
          control={form.control}
          name="code"
          render={({ field, fieldState }) => (
            <FormItem className="mb-1">
              <FormLabel>Код подтверждения</FormLabel>
              <FormControl>
                <Input
                  className={cn(
                    fieldState.error && "border-2 border-destructive",
                  )}
                  placeholder="Введите код подтверждения"
                  {...field}
                  onChange={handleCodeChange}
                  maxLength={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CodeSubmit type="button" onCodeSubmit={handleCodeSubmit} />
      </form>
    </Form>
  );
};

export default LoginForm;
