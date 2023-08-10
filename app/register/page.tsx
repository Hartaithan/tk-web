import { FC } from "react";
import IconLogo from "@/icons/logo";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { privacyPolicy, userAgreement } from "@/constants/links";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const RegisterPage: FC = () => {
  return (
    <main className="flex flex-col items-center justify-center p-6">
      <IconLogo className="w-24 mb-8" />
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
        <Label htmlFor="phone">Номер телефона</Label>
        <Input type="phone" id="phone" placeholder="Введите номер телефона" />
      </div>
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
      <Button className="w-full max-w-sm">Далее</Button>
    </main>
  );
};

export default RegisterPage;
