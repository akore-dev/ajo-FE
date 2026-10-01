// src/components/Chip.tsx
import { ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export default function Chip({ children, selected = false, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        "rounded-xl border px-4 py-2.5 text-[13px] font-semibold transition-colors",
        selected
          ? "border-ajo-orange bg-ajo-orange-tint text-ajo-orange-dark"
          : "border-ajo-border bg-white text-ajo-text-muted",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
