import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import IconLogo from "@/icons/logo";
import { Page } from "@/models/page";

interface LoginSearchParams {
  phone?: string;
}

const LoginPage: Page<Object, LoginSearchParams> = (props) => {
  const { searchParams } = props;

  return (
    <main className="flex flex-col items-center justify-center p-6">
      <IconLogo className="w-24 mb-8" />
      <p className="max-w-xs mb-4 text-center">
        {searchParams.phone
          ? `Введите код из СМС, отправленный на номер ${searchParams.phone}`
          : "Введите код из СМС, отправленный на ваш номер"}
      </p>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-1">
        <Label htmlFor="code">Код подтверждения</Label>
        <Input type="code" id="code" placeholder="Введите код подтверждения" />
      </div>
      <Button
        className="no-underline text-gray-400 font-normal mb-4"
        variant="link">
        Отправить код повторно через 30 сек
      </Button>
    </main>
  );
};

export default LoginPage;
