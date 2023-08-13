import LoginForm from "@/components/auth/login-form";
import IconLogo from "@/icons/logo";
import { LoginSearchParams } from "@/models/auth";
import { Page } from "@/models/page";

const LoginPage: Page<Object, LoginSearchParams> = (props) => {
  const { searchParams } = props;

  return (
    <main className="flex flex-col items-center justify-center p-6">
      <IconLogo className="w-24 mb-8" />
      <LoginForm searchParams={searchParams} />
    </main>
  );
};

export default LoginPage;
