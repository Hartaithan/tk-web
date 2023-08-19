"use client";

import { ChangeEventHandler, FC, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { LoginPayload, LoginSearchParams } from "@/models/auth";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import CodeSubmit from "./code-submit";
import { login } from "@/actions/login";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface LoginFormProps {
  searchParams: LoginSearchParams;
}

const schema = z.object({
  code: z.string().length(6, "Введите код"),
});

const LoginForm: FC<LoginFormProps> = (props) => {
  const { searchParams } = props;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: { code: "" },
    reValidateMode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const onSubmit = form.handleSubmit(async (values) => {
    if (!searchParams.phone) return;
    const payload: LoginPayload = {
      username: searchParams.phone,
      code: values.code,
    };
    startTransition(async () => {
      const res = await login(payload);
      if (res.status === 200) {
        router.push("/");
      } else {
        const message = res.data?.error_description || "Неизвестная ошибка";
        form.setError("code", { message });
      }
    });
  });

  const handleCodeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value.trim();
    form.setValue("code", value);
    if (value.length === 6) e.target.form?.requestSubmit();
  };

  const handleCodeSubmit = (): void => {
    console.log("submit code again");
  };

  return (
    <Form {...form}>
      <form className="max-w-sm" onSubmit={onSubmit}>
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
              <FormLabel className="flex">
                Код подтверждения
                {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              </FormLabel>
              <FormControl>
                <Input
                  className={cn(
                    fieldState.error && "border-2 border-destructive",
                  )}
                  placeholder="Введите код подтверждения"
                  {...field}
                  onChange={handleCodeChange}
                  maxLength={6}
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
