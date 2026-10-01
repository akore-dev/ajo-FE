// src/components/MenuRow.tsx
import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface MenuRowProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export default function MenuRow({ icon, label, onClick }: MenuRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 border-b border-ajo-border/60 py-4 text-left last:border-none"
    >
      <span className="text-ajo-text-muted">{icon}</span>
      <span className="flex-1 text-[15px] text-ajo-text">{label}</span>
      <ChevronRight size={16} className="text-ajo-text-faint" />
    </button>
  );
}
