// src/components/TransactionRow.tsx
import { ReactNode } from "react";
import { formatSignedNaira } from "../utils/format";

interface TransactionRowProps {
  leading: ReactNode;
  title: string;
  subtitle: string;
  amount: number;
  onClick?: () => void;
}

export default function TransactionRow({ leading, title, subtitle, amount, onClick }: TransactionRowProps) {
  const isCredit = amount >= 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 py-3 text-left disabled:cursor-default"
      disabled={!onClick}
    >
      {leading}
      <div className="flex-1">
        <p className="text-[14px] font-semibold text-ajo-text">{title}</p>
        <p className="text-[12px] text-ajo-text-muted">{subtitle}</p>
      </div>
      <span className={["text-[14px] font-semibold", isCredit ? "text-ajo-green" : "text-ajo-red"].join(" ")}>
        {formatSignedNaira(amount)}
      </span>
    </button>
  );
}
