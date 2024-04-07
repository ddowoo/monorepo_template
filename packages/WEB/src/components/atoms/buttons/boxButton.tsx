import { ButtonHTMLAttributes } from "react";

const COLOR_BY_TYPE = {
  primary: "bg-cyan-500",
  secondary: "bg-rose-500",
  disabled: "bg-gray-400",
};

const FONT_COLOR_BY_TYPE = {
  primary: "bg-cyan-500",
  secondary: "bg-rose-500",
  disabled: "bg-gray-400",
};

type Props = {
  role: "primary" | "secondary" | "disabled";
  text: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const BoxButton = ({ role, text, ...props }: Props) => {
  return (
    <button className={`w-full py-2 rounded-lg text-white ${COLOR_BY_TYPE[role]}`} {...props}>
      {text}
    </button>
  );
};

export default BoxButton;
