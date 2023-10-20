import { IconProps } from "@/models/icon";
import { FC } from "react";

const IconMenu: FC<IconProps> = ({
  width = 24,
  height = 24,
  color = "#FFFFFF",
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={color}
      {...rest}>
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
    </svg>
  );
};

export default IconMenu;
