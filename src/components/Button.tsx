// src/components/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  children: ReactNode;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-pill font-sans text-[15px] font-semibold " +
  "transition-colors duration-150 focus-visible:outline focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-ajo-orange disabled:opacity-40 " +
  "disabled:pointer-events-none select-none";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-ajo-orange text-white h-14 px-6 hover:bg-ajo-orange-dark active:bg-ajo-orange-dark",
  secondary:
    "bg-ajo-ink text-white h-14 px-6 hover:bg-ajo-ink-soft active:bg-ajo-ink-soft",
  outline:
    "bg-white text-ajo-text border border-ajo-border h-14 px-6 hover:bg-ajo-cream-dim",
  ghost: "bg-transparent text-ajo-text-muted h-11 px-2 hover:text-ajo-text",
};

export default function Button({
  variant = "primary",
  fullWidth = true,
  leadingIcon,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={[
        baseStyles,
        variantStyles[variant],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {leadingIcon}
      {children}
    </button>
  );
}
