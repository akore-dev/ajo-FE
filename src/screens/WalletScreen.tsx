"use client";

// src/screens/WalletScreen.tsx
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, ArrowUpRight } from "lucide-react";
import Shell from "../components/Shell";
import Card from "../components/Card";
import Button from "../components/Button";
import Avatar from "../components/Avatar";
import SectionHeader from "../components/SectionHeader";
import TransactionRow from "../components/TransactionRow";
import BottomNav from "../components/BottomNav";
import { formatNaira, formatSignedNaira } from "../utils/format";
import type { NavRoute, Transaction } from "../types";

interface WalletScreenProps {
  availableBalance?: number;
  monthDelta?: number;
  contributedThisMonth?: number;
  payoutReceivedThisMonth?: number;
  transactions?: Transaction[];
  onBack?: () => void;
  onAddMoney?: () => void;
  onSend?: () => void;
  onSeeAllActivity?: () => void;
  onOpenTransaction?: (id: string) => void;
  onNavigate?: (route: NavRoute) => void;
}

const defaultTransactions: Transaction[] = [
  {
    id: "t1",
    type: "payout",
    title: "Circle payout",
    subtitle: "Family Circle · 04 Sep",
    amount: 485000,
    currency: "₦",
    date: "2026-09-04",
    status: "completed",
  },
  {
    id: "t2",
    type: "contribution",
    title: "Contribution",
    subtitle: "Family Circle · 02 Sep",
    amount: -50000,
    currency: "₦",
    date: "2026-09-02",
    status: "completed",
  },
  {
    id: "t3",
    type: "wallet_funding",
    title: "Wallet funding",
    subtitle: "01 Sep",
    amount: 100000,
    currency: "₦",
    date: "2026-09-01",
    status: "completed",
  },
];

export default function WalletScreen({
  availableBalance = 245000,
  monthDelta = 80000,
  contributedThisMonth = 100000,
  payoutReceivedThisMonth = 485000,
  transactions = defaultTransactions,
  onBack,
  onAddMoney,
  onSend,
  onSeeAllActivity,
  onOpenTransaction,
  onNavigate,
}: WalletScreenProps) {
  const [balanceHidden, setBalanceHidden] = useState(false);

  return (
    <Shell>
      <div className="flex flex-1 flex-col overflow-y-auto px-6 pt-8 pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ajo-border bg-white"
          >
            <ArrowLeft size={18} className="text-ajo-text" />
          </button>
          <h1 className="font-display text-[18px] font-semibold text-ajo-text">Wallet</h1>
        </div>

        <Card className="mt-6">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-ajo-text-muted">Available balance</span>
            <button
              type="button"
              onClick={() => setBalanceHidden((v) => !v)}
              aria-label="Toggle balance visibility"
            >
              {balanceHidden ? (
                <EyeOff size={16} className="text-ajo-text-muted" />
              ) : (
                <Eye size={16} className="text-ajo-text-muted" />
              )}
            </button>
          </div>
          <p className="mt-2 font-display text-[30px] font-semibold text-ajo-text">
            {balanceHidden ? "₦••••••" : formatNaira(availableBalance)}
          </p>
          <div className="mt-2 flex items-center gap-1 text-[13px] font-medium text-ajo-green">
            <ArrowUpRight size={14} />
            <span>{formatSignedNaira(monthDelta)} this month</span>
          </div>
        </Card>

        <div className="mt-4 flex gap-3">
          <Button variant="primary" onClick={onAddMoney}>
            Add money
          </Button>
          <Button variant="outline" onClick={onSend}>
            Send
          </Button>
        </div>

        <div className="mt-6">
          <h2 className="text-[13px] font-semibold text-ajo-text-muted">This month</h2>
          <div className="mt-3 flex flex-col divide-y divide-ajo-border/60 rounded-card border border-ajo-border/60 bg-white">
            <div className="flex items-center justify-between px-4 py-3">
              <p className="text-[13px] text-ajo-text-muted">Contributed</p>
              <p className="text-[14px] font-semibold text-ajo-text">
                {formatSignedNaira(-contributedThisMonth)}
              </p>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <p className="text-[13px] text-ajo-text-muted">Payout received</p>
              <p className="text-[14px] font-semibold text-ajo-green">
                {formatSignedNaira(payoutReceivedThisMonth)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <SectionHeader title="Recent activity" actionLabel="See all" onAction={onSeeAllActivity} />
          <div className="mt-1 divide-y divide-ajo-border/60">
            {transactions.map((tx) => (
              <TransactionRow
                key={tx.id}
                title={tx.title}
                subtitle={tx.subtitle}
                amount={tx.amount}
                onClick={() => onOpenTransaction?.(tx.id)}
                leading={<Avatar name={tx.title} size={40} />}
              />
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="wallet" onNavigate={onNavigate} />
    </Shell>
  );
}
