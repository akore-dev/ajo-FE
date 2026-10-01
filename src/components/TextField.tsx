// src/components/TextField.tsx
import { InputHTMLAttributes, ReactNode, useId } from "react";

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  icon?: ReactNode;
  /** Element rendered on the right edge, e.g. a show/hide password toggle. */
  trailing?: ReactNode;
  error?: string;
}

export default function TextField({
  label,
  icon,
  trailing,
  error,
  id,
  className = "",
  ...rest
}: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-[13px] font-medium text-ajo-text-muted">
        {label}
      </label>
      <div
        className={[
          "flex items-center gap-3 rounded-xl border bg-white px-4 h-14",
          error ? "border-red-400" : "border-ajo-border focus-within:border-ajo-orange",
        ].join(" ")}
      >
        {icon && <span className="text-ajo-text-faint shrink-0">{icon}</span>}
        <input
          id={inputId}
          className={[
            "w-full bg-transparent text-[15px] text-ajo-text placeholder:text-ajo-text-faint outline-none",
            className,
          ].join(" ")}
          {...rest}
        />
        {trailing && <span className="shrink-0">{trailing}</span>}
      </div>
      {error && <span className="text-[12px] text-red-500">{error}</span>}
    </div>
  );
}
