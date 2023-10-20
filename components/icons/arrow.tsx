import { IconProps } from "@/models/icon";
import { FC } from "react";

const IconArrow: FC<IconProps> = ({
  width = 24,
  height = 24,
  color = "#000000",
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={width}
      width={width}
      fill={color}
      {...rest}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </svg>
  );
};

export default IconArrow;
