"use client";

// src/screens/YourTurnScreen.tsx
import { ArrowLeft, Users, User, Sun } from "lucide-react";
import Shell from "../components/Shell";
import Card from "../components/Card";
import PositionWheel from "../components/PositionWheel";
import { formatNaira } from "../utils/format";
import BottomNav from "../components/BottomNav";
import type { NavRoute } from "../types";

interface YourTurnScreenProps {
  circleName?: string;
  totalPositions?: number;
  position?: number;
  membersBeforeYou?: number;
  membersAfterYou?: number;
  expectedPayout?: number;
  cyclesAway?: number;
  onBack?: () => void;
  onNavigate?: (route: NavRoute) => void;
}

export default function YourTurnScreen({
  circleName = "Family Circle",
  totalPositions = 10,
  position = 7,
  membersBeforeYou = 3,
  membersAfterYou = 3,
  expectedPayout = 485000,
  cyclesAway = 3,
  onBack,
  onNavigate,
}: YourTurnScreenProps) {
  return (
    <Shell>
      <div className="flex flex-1 flex-col overflow-y-auto px-6 pt-8 pb-8">
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="absolute left-0 flex h-9 w-9 items-center justify-center rounded-full border border-ajo-border bg-white"
          >
            <ArrowLeft size={18} className="text-ajo-text" />
          </button>
          <h1 className="font-display text-[18px] font-semibold text-ajo-text">Your Turn</h1>
        </div>

        <h2 className="mt-4 text-center font-display text-[22px] font-semibold text-ajo-text">
          {circleName}
        </h2>

        <div className="mt-8 flex justify-center">
          <PositionWheel total={totalPositions} current={position} sublabel={`of ${totalPositions}`} />
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <div className="flex items-center gap-3 text-[14px] text-ajo-text-muted">
            <Users size={18} />
            <span>{membersBeforeYou} members before you</span>
          </div>
          <div className="flex items-center gap-3 text-[14px] font-semibold text-ajo-text">
            <User size={18} className="text-ajo-text" />
            <span>You</span>
          </div>
          <div className="flex items-center gap-3 text-[14px] text-ajo-text-muted">
            <Users size={18} />
            <span>{membersAfterYou} members after you</span>
          </div>
        </div>

        <Card className="mt-6">
          <span className="text-[12px] font-medium text-ajo-text-muted">Expected payout</span>
          <p className="font-display text-[26px] font-semibold text-ajo-text">
            {formatNaira(expectedPayout)}
          </p>
          <p className="text-[12px] font-medium text-ajo-orange">{cyclesAway} cycles away</p>
        </Card>

        <div className="relative mt-8 overflow-hidden rounded-card">
          <svg
            aria-hidden="true"
            viewBox="0 0 400 120"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
          >
            <path d="M0 80C80 40 140 100 220 70C280 48 340 90 400 60V120H0Z" fill="#FBE4D3" opacity="0.6" />
            <path d="M0 95C90 65 170 110 250 85C310 68 350 100 400 85V120H0Z" fill="#F6C89A" opacity="0.5" />
          </svg>
          <div className="relative flex items-start justify-center gap-2 p-4 text-center text-[13px] text-ajo-text-muted">
            <Sun size={16} className="mt-0.5 text-ajo-orange" />
            <p>You&apos;re getting closer! Keep going.</p>
          </div>
        </div>
      </div>
      <BottomNav active="circles" onNavigate={onNavigate} />
    </Shell>
  );
}
