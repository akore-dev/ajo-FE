// src/components/FeatureRow.tsx
import { ReactNode } from "react";

interface FeatureRowProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

export default function FeatureRow({ icon, title, subtitle }: FeatureRowProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ajo-orange-tint text-ajo-orange-dark">
        {icon}
      </div>
      <div>
        <p className="text-[14px] font-semibold text-ajo-text">{title}</p>
        <p className="text-[13px] text-ajo-text-muted">{subtitle}</p>
      </div>
    </div>
  );
}
