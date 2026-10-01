"use client";

// src/screens/TransactionDetailsScreen.tsx
import { useState } from "react";
import { ArrowLeft, RefreshCw, Copy, Check } from "lucide-react";
import Shell from "../components/Shell";
import Card from "../components/Card";
import IconAvatar from "../components/IconAvatar";
import DetailRow from "../components/DetailRow";
import StatusPill from "../components/StatusPill";
import Button from "../components/Button";
import { formatNaira, formatSignedNaira } from "../utils/format";
import type { Transaction } from "../types";

interface TransactionDetailsScreenProps {
  transaction?: Transaction;
  onBack?: () => void;
}

const defaultTransaction: Transaction = {
  id: "AJO-8F29-4K3D",
  type: "payout",
  title: "Circle payout",
  subtitle: "Family Circle",
  amount: 485000,
  currency: "₦",
  date: "2026-09-08T12:42:00",
  status: "completed",
  reference: "AJO-8F29-4K3D",
  balanceAfter: 730000,
};

export default function TransactionDetailsScreen({
  transaction = defaultTransaction,
  onBack,
}: TransactionDetailsScreenProps) {
  const [copied, setCopied] = useState(false);

  const formattedDate = new Date(transaction.date).toLocaleString("en-NG", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  async function handleCopy() {
    if (!transaction.reference) return;
    try {
      await navigator.clipboard.writeText(transaction.reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable — fail silently in this context.
    }
  }

  return (
    <Shell>
      <div className="flex flex-1 flex-col overflow-y-auto px-6 pt-8 pb-8">
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="absolute left-0 flex h-9 w-9 items-center justify-center rounded-full border border-transparent"
          >
            <ArrowLeft size={18} className="text-ajo-text" />
          </button>
          <h1 className="font-display text-[18px] font-semibold text-ajo-text">Transaction Details</h1>
        </div>

        {/* Left-aligned header row: icon + title/subtitle inline */}
        <div className="mt-6 flex items-center gap-3">
          <IconAvatar icon={<RefreshCw size={20} />} size={48} tone="orange" />
          <div>
            <p className="text-[15px] font-semibold text-ajo-text">{transaction.title}</p>
            <p className="text-[13px] text-ajo-text-muted">{transaction.subtitle}</p>
          </div>
        </div>

        {/* Amount is always navy — not colored by credit/debit on this screen */}
        <p className="mt-5 font-display text-[30px] font-semibold text-ajo-text">
          {formatSignedNaira(transaction.amount)}
        </p>
        <p className="text-[13px] text-ajo-text-faint">{formattedDate}</p>

        <Card className="mt-6 divide-y divide-ajo-border/60">
          <DetailRow label="Reference" value={transaction.reference ?? "—"} />
          <DetailRow label="Status" value={<StatusPill status={transaction.status} />} />
          {transaction.balanceAfter !== undefined && (
            <DetailRow label="Balance after" value={formatNaira(transaction.balanceAfter)} />
          )}
        </Card>

        <Button
          variant="outline"
          className="mt-6"
          onClick={handleCopy}
          leadingIcon={copied ? <Check size={16} /> : <Copy size={16} />}
        >
          {copied ? "Copied" : "Copy reference"}
        </Button>
      </div>
    </Shell>
  );
}
