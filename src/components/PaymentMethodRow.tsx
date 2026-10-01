// src/components/PaymentMethodRow.tsx
import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface PaymentMethodRowProps {
  icon: ReactNode;
  label: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function PaymentMethodRow({ icon, label, description, selected = false, onClick }: PaymentMethodRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex w-full items-center gap-3 rounded-card border bg-white p-4 text-left transition-colors",
        selected ? "border-ajo-orange" : "border-ajo-border/60",
      ].join(" ")}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ajo-cream-dim text-ajo-text">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-[14px] font-semibold text-ajo-text">{label}</p>
        <p className="text-[12px] text-ajo-text-muted">{description}</p>
      </div>
      {selected ? (
        <div className="h-5 w-5 rounded-full border-[5px] border-ajo-orange" />
      ) : (
        <ChevronRight size={16} className="text-ajo-text-faint" />
      )}
    </button>
  );
}
