"use client";

// src/screens/ContributionScreen.tsx
import { ArrowLeft, Users, CheckCircle2, ShieldCheck } from "lucide-react";
import Shell from "../components/Shell";
import Button from "../components/Button";
import FeatureRow from "../components/FeatureRow";
import { formatNaira } from "../utils/format";

interface ContributionScreenProps {
  circleName?: string;
  cycle?: number;
  dueDate?: string;
  amount?: number;
  onBack?: () => void;
  onPay?: () => void;
}

export default function ContributionScreen({
  circleName = "Family Circle",
  cycle = 4,
  dueDate = "Sep 15, 2026",
  amount = 50000,
  onBack,
  onPay,
}: ContributionScreenProps) {
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
          <h1 className="font-display text-[18px] font-semibold text-ajo-text">Contribution</h1>
        </div>

        {/* Left-aligned content, matching the original layout */}
        <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-ajo-green-tint">
          <Users size={24} className="text-ajo-green" />
        </div>

        <h2 className="mt-4 font-display text-[19px] font-semibold text-ajo-text">{circleName}</h2>
        <p className="mt-1 text-[13px] text-ajo-text-muted">
          Cycle {String(cycle).padStart(2, "0")} · Due {dueDate}
        </p>

        <p className="mt-6 font-display text-[32px] font-semibold text-ajo-text">
          {formatNaira(amount)}
        </p>
        <p className="text-[13px] text-ajo-text-muted">Monthly contribution</p>

        <div className="mt-4 flex items-center gap-2 rounded-xl bg-ajo-green-tint px-4 py-3 text-[13px] font-medium text-ajo-green">
          <CheckCircle2 size={16} />
          <span>You&apos;re ready</span>
        </div>

        <Button variant="primary" className="mt-6" onClick={onPay}>
          Pay {formatNaira(amount)}
        </Button>

        <div className="my-6 h-px bg-ajo-border" />

        <div className="relative">
          <h3 className="text-[13px] font-semibold text-ajo-text-muted">How it works</h3>
          <div className="relative mt-4 flex flex-col gap-5">
            <FeatureRow
              icon={<ShieldCheck size={18} />}
              title="Secure payment"
              subtitle="We use trusted partners"
            />
            <FeatureRow
              icon={<ShieldCheck size={18} />}
              title="Instant confirmation"
              subtitle="You'll get a receipt"
            />
            <FeatureRow
              icon={<ShieldCheck size={18} />}
              title="Your circle moves closer"
              subtitle="To the next payout"
            />
          </div>

          {/* Decorative leaf illustration, bottom-right — echoes the "growth" theme */}
          <svg
            aria-hidden="true"
            width="110"
            height="100"
            viewBox="0 0 110 100"
            className="pointer-events-none absolute -bottom-4 right-0 opacity-90"
          >
            <path
              d="M100 95C80 95 55 85 45 65C35 45 40 20 60 8C58 30 62 50 78 62C90 71 100 82 100 95Z"
              fill="#DFF1E8"
            />
            <path
              d="M100 95C85 90 68 78 62 60C56 42 60 22 74 10"
              stroke="#1F8A5F"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M95 92C82 80 60 68 48 48C40 34 42 18 55 6C50 26 55 44 68 56C80 67 90 80 95 92Z"
              fill="#C9E9D9"
              opacity="0.7"
            />
          </svg>
        </div>
      </div>
    </Shell>
  );
}
