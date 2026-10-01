// src/components/Badge.tsx
import type { CircleStatus } from "../types";

interface BadgeProps {
  status: CircleStatus;
}

const styles: Record<CircleStatus, string> = {
  active: "bg-ajo-green-tint text-ajo-green",
  recruiting: "bg-ajo-orange-tint text-ajo-orange-dark",
  completed: "bg-ajo-cream-dim text-ajo-text-muted",
};

const labels: Record<CircleStatus, string> = {
  active: "Active",
  recruiting: "Recruiting",
  completed: "Completed",
};

export default function Badge({ status }: BadgeProps) {
  return (
    <span className={["rounded-pill px-2.5 py-1 text-[11px] font-semibold", styles[status]].join(" ")}>
      {labels[status]}
    </span>
  );
}
