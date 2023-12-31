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
import { cn } from "@/lib/styles";
import { Input } from "../ui/input";
import { useIMask } from "react-imask";
import { RegisterPayload } from "@/models/auth";
import { register } from "@/actions/register";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const schema = z.object({
  phone: z.string().min(18, "Заполните поле"),
});

const RegisterForm: FC = () => {
  const router = useRouter();
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
    const encoded = encodeURIComponent(unmasked);
    const payload: RegisterPayload = {
      national: "+7",
      phone: unmasked,
    };
    startTransition(async () => {
      const res = await register(payload);
      if (res.status === 200) {
        router.push("/login?phone=" + encoded);
      } else {
        const message = res.data?.message || "Неизвестная ошибка";
        form.setError("phone", { message });
      }
    });
  });

  return (
    <Form {...form}>
      <form className="max-w-sm" onSubmit={onSubmit}>
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
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="max-w-sm mb-4 text-sm text-center">
          Нажимая кнопку &quot;Далее&quot;, вы принимаете&nbsp;
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
        <Button className="w-full max-w-sm" type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Загрузка..." : "Далее"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
