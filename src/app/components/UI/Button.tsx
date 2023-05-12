"use client";

import { IconType } from "react-icons";

type buttonProps = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
};

function Button({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}: buttonProps) {
  const buttonStyles = `relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${
    outline
      ? "bg-white border-black text-black active:bg-gray-200"
      : "bg-rose-500 text-rose-50 border-rose-500 active:bg-rose-600"
  }
  } ${
    small
      ? "py-1 font-light text-sm border-[1px]"
      : "py-3 font-semibold text-md border-[2px]"
  } `;

  return (
    <button onClick={onClick} disabled={disabled} className={buttonStyles}>
      {Icon ? <Icon size={24} className="absolute left-4 top-3" /> : null}
      {label}
    </button>
  );
}

export default Button;
