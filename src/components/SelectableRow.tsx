// src/components/SelectableRow.tsx
import { ReactNode } from "react";

interface SelectableRowProps {
  icon: ReactNode;
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function SelectableRow({ icon, label, selected = false, onClick }: SelectableRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex w-full items-center gap-3 rounded-card border p-4 text-left transition-colors",
        selected ? "border-ajo-orange bg-ajo-orange-tint" : "border-ajo-border bg-white",
      ].join(" ")}
    >
      <span className={selected ? "text-ajo-orange-dark" : "text-ajo-text-muted"}>{icon}</span>
      <span className={["flex-1 text-[15px] font-medium", selected ? "text-ajo-orange-dark" : "text-ajo-text"].join(" ")}>
        {label}
      </span>
      <span
        className={[
          "flex h-5 w-5 items-center justify-center rounded-full border-2",
          selected ? "border-ajo-orange" : "border-ajo-border",
        ].join(" ")}
      >
        {selected && <span className="h-2.5 w-2.5 rounded-full bg-ajo-orange" />}
      </span>
    </button>
  );
}
