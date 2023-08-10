"use client";

import { FC, Ref } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { privacyPolicy, userAgreement } from "@/constants/links";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { useIMask } from "react-imask";

// const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const schema = z.object({
  phone: z.string().min(18, "Заполните поле"),
});

const RegisterForm: FC = () => {
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: { phone: "" },
    reValidateMode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const { ref, value, setValue } = useIMask(
    { mask: "+7 (000) 000-00-00" },
    { onAccept: (value) => form.setValue("phone", value) },
  );

  const onSubmit = form.handleSubmit((data) => {
    const unmasked = data.phone.replace(/[^\d]/g, "").slice(1);
    console.log("unmasked", unmasked);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="phone"
          render={({ field, fieldState }) => (
            <FormItem className="mb-4">
              <FormLabel>Номер телефона</FormLabel>
              <FormControl>
                <Input
                  className={cn(
                    fieldState.error && "border-2 border-destructive",
                  )}
                  placeholder="Введите номер телефона"
                  {...field}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  ref={ref as Ref<HTMLInputElement>}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="max-w-sm mb-4 text-sm text-center">
          Нажимая кнопку "Далее", вы принимаете&nbsp;
          <Link
            className="text-primary underline"
            href={userAgreement}
            target="_blank">
            Условия пользовательского соглашения
          </Link>
          &nbsp;и&nbsp;
          <Link
            className="text-primary underline"
            href={privacyPolicy}
            target="_blank">
            политику конфиденциальности
          </Link>
        </p>
        <Button className="w-full max-w-sm" type="submit">
          Далее
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
