// src/components/SectionHeader.tsx
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function SectionHeader({ title, actionLabel, onAction }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-display text-[17px] font-semibold text-ajo-text">{title}</h2>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="flex items-center gap-0.5 text-[13px] font-medium text-ajo-orange"
        >
          {actionLabel}
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}
