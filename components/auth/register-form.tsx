"use client";

import { FC, Ref, useTransition } from "react";
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
import { RegisterPayload } from "@/models/auth";
import { register } from "@/actions/register";

const schema = z.object({
  phone: z.string().min(18, "Заполните поле"),
});

const RegisterForm: FC = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: { phone: "" },
    reValidateMode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const { ref, value, setValue } = useIMask(
    { mask: "+7 (000) 000-00-00" },
    { onAccept: (value) => form.setValue("phone", value) },
  );

  const onSubmit = form.handleSubmit(async (values) => {
    const unmasked = values.phone.replace(/[^0-9+]/g, "");
    const payload: RegisterPayload = {
      national: "+7",
      phone: unmasked,
    };
    startTransition(async () => {
      const res = await register(payload);
      if (res.status === 200) {
        console.log("success", res.data);
      } else {
        console.log("fail", res);
      }
    });
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
          {isPending ? "Загрузка..." : "Далее"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
