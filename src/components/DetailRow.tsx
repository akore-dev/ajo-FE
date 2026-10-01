// src/components/DetailRow.tsx
import { ReactNode } from "react";

interface DetailRowProps {
  label: string;
  value: ReactNode;
}

export default function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-[13px] text-ajo-text-muted">{label}</span>
      <span className="text-[14px] font-semibold text-ajo-text">{value}</span>
    </div>
  );
}
