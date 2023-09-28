import { HeaderProps } from "@/models/header";
import { FC } from "react";

const StaticHeader: FC<HeaderProps> = (props) => {
  const { title } = props;
  return (
    <header className="flex items-center justify-center min-h-[48px]">
      <p className="uppercase font-bold">{title}</p>
    </header>
  );
};

export default StaticHeader;
