"use client";

// src/screens/ContributionCompleteScreen.tsx
import { CheckCircle2, Sun } from "lucide-react";
import Shell from "../components/Shell";
import Card from "../components/Card";
import Button from "../components/Button";
import SuccessBadge from "../components/SuccessBadge";
import { formatNaira } from "../utils/format";

interface ContributionCompleteScreenProps {
  amount?: number;
  circleName?: string;
  cycle?: number;
  membersPaid?: number;
  memberCount?: number;
  onViewCircle?: () => void;
  onBackToHome?: () => void;
}

export default function ContributionCompleteScreen({
  amount = 50000,
  circleName = "Family Circle",
  cycle = 4,
  membersPaid = 8,
  memberCount = 10,
  onViewCircle,
  onBackToHome,
}: ContributionCompleteScreenProps) {
  return (
    <Shell>
      <div className="relative flex flex-1 flex-col items-center overflow-y-auto px-6 pt-16 pb-8 text-center">
        <SuccessBadge spread={2.2} />

        <h1 className="mt-6 font-display text-[24px] font-semibold text-ajo-text">
          Contribution Complete!
        </h1>

        <p className="mt-4 font-display text-[30px] font-semibold text-ajo-text">
          {formatNaira(amount)}
        </p>
        <p className="text-[13px] text-ajo-text-muted">
          {circleName} · Cycle {String(cycle).padStart(2, "0")}
        </p>

        <Card className="mt-6 w-full text-left">
          <div className="flex items-center gap-2 text-[14px] font-semibold text-ajo-green">
            <CheckCircle2 size={18} />
            <span>
              {membersPaid} of {memberCount} members have paid this cycle
            </span>
          </div>
          <div className="mt-3 flex items-start gap-2 text-[13px] text-ajo-text-muted">
            <Sun size={16} className="mt-0.5 shrink-0 text-ajo-orange" />
            <p>Your contribution brings the circle one step closer to payout.</p>
          </div>
        </Card>

        <Button variant="primary" className="mt-8" onClick={onViewCircle}>
          View circle
        </Button>
        <button
          type="button"
          onClick={onBackToHome}
          className="mt-4 text-[14px] font-medium text-ajo-text-muted"
        >
          Back to home
        </button>

        <svg
          aria-hidden="true"
          viewBox="0 0 400 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute bottom-0 left-0 h-24 w-full opacity-60"
        >
          <path d="M0 70C100 40 180 90 260 65C320 46 360 75 400 55V100H0Z" fill="#FBE4D3" />
        </svg>
      </div>
    </Shell>
  );
}
