"use client";

// src/screens/HomeScreen.tsx
import { useState } from "react";
import { Bell, Eye, EyeOff, ArrowUpRight } from "lucide-react";
import Shell from "../components/Shell";
import Card from "../components/Card";
import Avatar from "../components/Avatar";
import ProgressRing from "../components/ProgressRing";
import SectionHeader from "../components/SectionHeader";
import BottomNav from "../components/BottomNav";
import Button from "../components/Button";
import { formatNaira, formatSignedNaira } from "../utils/format";
import type { NavRoute } from "../types";

interface HomeCirclePreview {
  id: string;
  name: string;
  membersPaid: number;
  memberCount: number;
}

interface HomeScreenProps {
  userFirstName?: string;
  availableBalance?: number;
  monthDelta?: number;
  nextTurn?: {
    circleName: string;
    position: number;
    totalPositions: number;
    expectedPayout: number;
    cyclesAway: number;
  };
  circles?: HomeCirclePreview[];
  onViewCircle?: () => void;
  onSeeAllCircles?: () => void;
  onNavigate?: (route: NavRoute) => void;
  onToggleBalanceVisibility?: (hidden: boolean) => void;
}

export default function HomeScreen({
  userFirstName = "Ibrahim",
  availableBalance = 245000,
  monthDelta = 80000,
  nextTurn = {
    circleName: "Family Circle",
    position: 7,
    totalPositions: 10,
    expectedPayout: 485000,
    cyclesAway: 3,
  },
  circles = [{ id: "family", name: "Family Circle", membersPaid: 4, memberCount: 10 }],
  onViewCircle,
  onSeeAllCircles,
  onNavigate,
  onToggleBalanceVisibility,
}: HomeScreenProps) {
  const [balanceHidden, setBalanceHidden] = useState(false);

  function toggleBalance() {
    const next = !balanceHidden;
    setBalanceHidden(next);
    onToggleBalanceVisibility?.(next);
  }

  return (
    <Shell>
      <div className="flex flex-1 flex-col overflow-y-auto px-6 pt-8 pb-4">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-semibold text-ajo-text">Ajo</span>
          <button
            type="button"
            aria-label="Notifications"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-ajo-border"
          >
            <Bell size={18} className="text-ajo-text" />
          </button>
        </div>

        {/* Greeting */}
        <div className="mt-5">
          <h1 className="font-display text-[22px] font-semibold text-ajo-text">
            Good morning, {userFirstName} 👋
          </h1>
          <p className="mt-1 text-[14px] text-ajo-text-muted">
            Your money is moving. Your circles are on track.
          </p>
        </div>

        {/* Balance card */}
        <div className="relative mt-5 overflow-hidden rounded-card bg-gradient-to-br from-ajo-orange-tint to-ajo-cream-dim p-5">
          <svg
            aria-hidden="true"
            viewBox="0 0 200 140"
            className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-52 opacity-90"
          >
            <circle cx="140" cy="90" r="70" fill="#F6C89A" opacity="0.55" />
            <circle cx="175" cy="110" r="48" fill="#EFA65C" opacity="0.6" />
            <circle cx="150" cy="60" r="30" fill="#FBE4D3" opacity="0.7" />
          </svg>
          <div className="relative flex items-center justify-between">
            <span className="text-[13px] font-medium text-ajo-text-muted">Available balance</span>
            <button type="button" onClick={toggleBalance} aria-label="Toggle balance visibility">
              {balanceHidden ? (
                <EyeOff size={16} className="text-ajo-text-muted" />
              ) : (
                <Eye size={16} className="text-ajo-text-muted" />
              )}
            </button>
          </div>
          <p className="relative mt-2 font-display text-[30px] font-semibold text-ajo-text">
            {balanceHidden ? "₦••••••" : formatNaira(availableBalance)}
          </p>
          <div className="relative mt-2 flex items-center gap-1 text-[13px] font-medium text-ajo-green">
            <ArrowUpRight size={14} />
            <span>{formatSignedNaira(monthDelta)} this month</span>
          </div>
        </div>

        {/* Next turn card */}
        <Card className="mt-5">
          <span className="text-[13px] font-medium text-ajo-text-muted">Your next turn</span>
          <div className="mt-2 flex items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-display text-[17px] font-semibold text-ajo-text">
                {nextTurn.circleName}
              </h3>
              <p className="mt-0.5 text-[13px] text-ajo-text-muted">
                {String(nextTurn.position).padStart(2, "0")} of {nextTurn.totalPositions}
              </p>

              <span className="mt-3 inline-block rounded-pill bg-ajo-orange-tint px-2.5 py-1 text-[11px] font-semibold text-ajo-orange-dark">
                Your turn
              </span>

              <p className="mt-3 text-[12px] text-ajo-text-muted">Expected payout</p>
              <p className="font-display text-[20px] font-semibold text-ajo-text">
                {formatNaira(nextTurn.expectedPayout)}
              </p>
              <p className="text-[12px] text-ajo-text-faint">{nextTurn.cyclesAway} cycles away</p>
            </div>

            <ProgressRing progress={nextTurn.position / nextTurn.totalPositions} size={72} strokeWidth={6}>
              <span className="font-display text-[20px] font-semibold text-ajo-text">
                {String(nextTurn.position).padStart(2, "0")}
              </span>
            </ProgressRing>
          </div>

          <Button variant="outline" className="mt-4 !bg-ajo-orange-tint !border-none !text-ajo-orange-dark" onClick={onViewCircle}>
            View circle →
          </Button>
        </Card>

        {/* Your circles */}
        <div className="mt-6">
          <SectionHeader title="Your circles" actionLabel="See all" onAction={onSeeAllCircles} />
          <div className="mt-3 flex flex-col gap-3">
            {circles.map((circle) => (
              <button
                key={circle.id}
                type="button"
                onClick={onViewCircle}
                className="flex items-center gap-3 rounded-card bg-white border border-ajo-border/60 p-3 text-left"
              >
                <Avatar name={circle.name} size={44} />
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-ajo-text">{circle.name}</p>
                  <p className="text-[12px] text-ajo-text-muted">
                    {circle.membersPaid} / {circle.memberCount} paid
                  </p>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-pill bg-ajo-border">
                    <div
                      className="h-full rounded-pill bg-ajo-orange"
                      style={{ width: `${(circle.membersPaid / circle.memberCount) * 100}%` }}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </Shell>
  );
}
