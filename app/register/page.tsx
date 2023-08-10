import { FC } from "react";
import IconLogo from "@/icons/logo";
import RegisterForm from "@/components/auth/register-form";

const RegisterPage: FC = () => {
  return (
    <main className="flex flex-col items-center justify-center p-6">
      <IconLogo className="w-24 mb-8" />
      <RegisterForm />
    </main>
  );
};

export default RegisterPage;
