"use client";

import { HeaderProps } from "@/models/header";
import { useRouter } from "next/navigation";
import { FC, useState, useTransition } from "react";
import IconArrow from "../icons/arrow";
import { Button } from "../ui/button";
import IconMenu from "../icons/menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import IconLogo from "../icons/logo";
import Link from "next/link";
import { logout } from "@/actions/logout";
import { Loader2 } from "lucide-react";

const Header: FC<HeaderProps> = (props) => {
  const { title, back = false } = props;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    setError(null);
    startTransition(async () => {
      const res = await logout();
      if (res.status === 200) {
        router.push("/register");
      } else {
        const message = res.data?.message || "Неизвестная ошибка";
        setError(message);
      }
    });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="flex items-center justify-center min-h-[48px] relative">
      {back && (
        <Button
          className="absolute top-1/2 left-2 transform -translate-y-1/2"
          variant="ghost"
          size="icon"
          onClick={handleBack}>
          <IconArrow />
        </Button>
      )}
      <p className="uppercase font-bold">{title}</p>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
            variant="ghost"
            size="icon">
            <IconMenu className="fill-primary" />
          </Button>
        </SheetTrigger>
        <SheetContent
          className="bg-primary flex flex-col justify-center items-center"
          closeClassName="h-8 w-8 stroke-white">
          <IconLogo width={100} height={100} mono />
          <div className="flex flex-col justify-center items-center gap-3 mt-6 relative">
            <Link className="text-md font-medium text-white" href="#">
              О приложении
            </Link>
            <Link className="text-md font-medium text-white" href="#">
              Чат
            </Link>
            <Button
              variant="link"
              className="p-0 h-auto text-md font-medium text-white hover:no-underline"
              onClick={handleLogout}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Загрузка..." : "Выйти из аккаунта"}
            </Button>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded w-80 -bottom-20 absolute"
                role="alert">
                <strong className="text-sm font-medium">{error}</strong>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
