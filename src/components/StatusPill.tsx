// src/components/StatusPill.tsx
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import type { TransactionStatus } from "../types";

interface StatusPillProps {
  status: TransactionStatus;
}

const config: Record<TransactionStatus, { color: string; label: string; icon: typeof CheckCircle2 }> = {
  completed: { color: "text-ajo-green", label: "Completed", icon: CheckCircle2 },
  pending: { color: "text-ajo-orange", label: "Pending", icon: Clock },
  failed: { color: "text-ajo-red", label: "Failed", icon: XCircle },
};

export default function StatusPill({ status }: StatusPillProps) {
  const { color, label, icon: Icon } = config[status];
  return (
    <span className={["inline-flex items-center gap-1 text-[13px] font-semibold", color].join(" ")}>
      <Icon size={14} />
      {label}
    </span>
  );
}
