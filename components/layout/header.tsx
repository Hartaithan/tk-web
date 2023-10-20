"use client";

import { HeaderProps } from "@/models/header";
import { useRouter } from "next/navigation";
import { FC } from "react";
import ArrowIcon from "../icons/arrow";
import { Button } from "../ui/button";

const Header: FC<HeaderProps> = (props) => {
  const { title, back = false } = props;
  const router = useRouter();

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
          <ArrowIcon />
        </Button>
      )}
      <p className="uppercase font-bold">{title}</p>
    </header>
  );
};

export default Header;
