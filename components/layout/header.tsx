"use client";

import { HeaderProps } from "@/models/header";
import { useRouter } from "next/navigation";
import { FC } from "react";
import IconArrow from "../icons/arrow";
import { Button } from "../ui/button";
import IconMenu from "../icons/menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

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
          <IconArrow />
        </Button>
      )}
      <p className="uppercase font-bold">{title}</p>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
            variant="ghost"
            size="icon"
            onClick={handleBack}>
            <IconMenu className="fill-primary" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet</SheetTitle>
            <SheetDescription>Content not found</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
