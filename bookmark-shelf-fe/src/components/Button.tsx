import type { ReactElement } from "react";
import { Loader2 } from "lucide-react"; 

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variantClasses: Record<"primary" | "secondary", string> = {
  primary:
    "bg-[#5045e4] text-white hover:bg-[#3e36ba] disabled:bg-[#918bed]",
  secondary:
    "bg-[#dfe6fe] text-black hover:bg-[#cad6fd] disabled:bg-[#ebefff]",
};

const defaultStyles =
  "px-4 py-2 rounded-md font-medium flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-60 shadow-sm";

export function Button({
  variant,
  text,
  startIcon,
  onClick,
  fullWidth,
  loading,
  type = "button",
  disabled,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      className={`${defaultStyles} ${variantClasses[variant]} ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {loading ? (
        <Loader2 className="animate-spin h-5 w-5" />
      ) : (
        <>
          {startIcon && <span className="mr-1">{startIcon}</span>}
          {text}
        </>
      )}
    </button>
  );
}
