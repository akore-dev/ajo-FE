// src/components/AmountInput.tsx
import { ChangeEvent } from "react";

interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
  currencySymbol?: string;
  label?: string;
}

export default function AmountInput({ value, onChange, currencySymbol = "₦", label }: AmountInputProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const digitsOnly = e.target.value.replace(/[^\d]/g, "");
    onChange(digitsOnly === "" ? 0 : Number(digitsOnly));
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-[13px] font-medium text-ajo-text-muted">{label}</label>}
      <div className="flex items-center gap-2 rounded-xl border border-ajo-border bg-white px-4 h-16 focus-within:border-ajo-orange">
        <span className="font-display text-[22px] font-semibold text-ajo-text-faint">{currencySymbol}</span>
        <input
          type="text"
          inputMode="numeric"
          value={value === 0 ? "" : value.toLocaleString("en-NG")}
          onChange={handleChange}
          placeholder="0"
          className="w-full bg-transparent font-display text-[22px] font-semibold text-ajo-text outline-none placeholder:text-ajo-text-faint"
        />
      </div>
    </div>
  );
}
