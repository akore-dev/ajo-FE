// src/components/EmptyState.tsx
import { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  /** When true, `icon` is rendered as-is (e.g. a full illustration) instead of wrapped in a colored circle. */
  bareIcon?: boolean;
}

export default function EmptyState({
  icon,
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  bareIcon = false,
}: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      {bareIcon ? (
        icon
      ) : (
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-ajo-orange-tint text-ajo-orange-dark">
          {icon}
        </div>
      )}
      <h1 className="mt-6 font-display text-[20px] font-semibold text-ajo-text">{title}</h1>
      <p className="mt-2 max-w-[260px] text-[14px] text-ajo-text-muted">{subtitle}</p>

      {(primaryAction || secondaryAction) && (
        <div className="mt-8 flex w-full flex-col gap-3">
          {primaryAction}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}
