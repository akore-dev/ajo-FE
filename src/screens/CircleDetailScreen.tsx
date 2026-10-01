"use client";

// src/screens/CircleDetailScreen.tsx
import { ArrowLeft, MoreVertical } from "lucide-react";
import Shell from "../components/Shell";
import Card from "../components/Card";
import Badge from "../components/Badge";
import AvatarStack from "../components/AvatarStack";
import CycleStepper from "../components/CycleStepper";
import ProgressRing from "../components/ProgressRing";
import Button from "../components/Button";
import BottomNav from "../components/BottomNav";
import { formatNaira } from "../utils/format";
import type { Circle, NavRoute } from "../types";

interface CircleDetailScreenProps {
  circle?: Circle;
  memberNames?: string[];
  membersBeforeYou?: number;
  membersAfterYou?: number;
  heroImageUrl?: string;
  onBack?: () => void;
  onMore?: () => void;
  onPay?: () => void;
  onNavigate?: (route: NavRoute) => void;
}

const defaultCircle: Circle = {
  id: "family",
  name: "Family Circle",
  category: "family",
  status: "active",
  memberCount: 10,
  capacity: 10,
  contributionAmount: 50000,
  currency: "Ã¢â€šÂ¦",
  cadence: "monthly",
  currentCycle: 4,
  totalCycles: 10,
  membersPaidThisCycle: 8,
  poolTotal: 400000,
  poolTarget: 500000,
  nextPayoutMemberName: "You",
  nextPayoutAmount: 485000,
  cyclesUntilYourTurn: 0,
  yourPosition: 7,
  members: [],
};

export default function CircleDetailScreen({
  circle = defaultCircle,
  memberNames = ["Ibrahim", "Amara", "Chidi", "Zainab", "Tunde", "Fatima"],
  membersBeforeYou = 3,
  membersAfterYou = 3,
  heroImageUrl = "/images/family-circle-hero.jpg",
  onBack,
  onMore,
  onPay,
  onNavigate,
}: CircleDetailScreenProps) {
  const poolRemaining = circle.poolTarget - circle.poolTotal;
  const poolFraction = circle.poolTarget > 0 ? circle.poolTotal / circle.poolTarget : 0;

  return (
    <Shell>
      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* Hero */}
        <div className="relative h-[260px] shrink-0 overflow-hidden">
          <img src={heroImageUrl} alt="" role="presentation" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />

          <div className="relative flex items-center justify-between px-5 pt-6">
            <button
              type="button"
              onClick={onBack}
              aria-label="Back"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur"
            >
              <ArrowLeft size={18} className="text-white" />
            </button>
            <button
              type="button"
              onClick={onMore}
              aria-label="More options"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur"
            >
              <MoreVertical size={18} className="text-white" />
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
            <h1 className="font-display text-[24px] font-semibold text-white">{circle.name}</h1>
            <p className="mt-0.5 text-[13px] text-white/75">
              {circle.capacity} members Ã‚Â· {circle.cadence === "monthly" ? "Monthly" : "Weekly"}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <AvatarStack names={memberNames} />
              <Badge status={circle.status} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-5 px-6 pt-6 pb-8">
          <Card>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium text-ajo-text-muted">Current cycle</span>
            </div>
            <p className="mt-1 font-display text-[22px] font-semibold text-ajo-text">
              {String(circle.currentCycle).padStart(2, "0")} / {circle.totalCycles}
            </p>
            <div className="mt-3">
              <CycleStepper total={circle.totalCycles} current={circle.currentCycle} />
            </div>
          </Card>

          <Card>
            <span className="text-[13px] font-medium text-ajo-text-muted">Pool progress</span>
            <p className="mt-1">
              <span className="font-display text-[22px] font-semibold text-ajo-text">
                {formatNaira(circle.poolTotal)}
              </span>
              <span className="text-[15px] text-ajo-text-faint"> / {formatNaira(circle.poolTarget)}</span>
            </p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-pill bg-ajo-cream-dim">
              <div className="h-full rounded-pill bg-ajo-orange" style={{ width: `${poolFraction * 100}%` }} />
            </div>
            <div className="mt-2 flex items-center justify-between text-[12px] text-ajo-text-muted">
              <span>
                {circle.membersPaidThisCycle} of {circle.capacity} members paid
              </span>
              <span>{formatNaira(poolRemaining)} remaining</span>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-ajo-orange-tint to-ajo-cream-dim border-none">
            <span className="font-display text-[17px] font-semibold text-ajo-orange">Your turn</span>
            <div className="mt-2 flex items-center justify-between gap-4">
              <div>
                <p className="text-[13px] text-ajo-text-muted">
                  Position {String(circle.yourPosition).padStart(2, "0")} of {circle.totalCycles}
                </p>
                <p className="mt-2 text-[13px] text-ajo-text-muted">{membersBeforeYou} members before you</p>
                <p className="text-[13px] text-ajo-text-muted">{membersAfterYou} members after you</p>
              </div>
              <ProgressRing progress={circle.yourPosition / circle.totalCycles} size={72} strokeWidth={6}>
                <span className="font-display text-[20px] font-semibold text-ajo-text">
                  {String(circle.yourPosition).padStart(2, "0")}
                </span>
              </ProgressRing>
            </div>
            <Button variant="primary" className="mt-4" onClick={onPay}>
              Pay {formatNaira(circle.contributionAmount)}
            </Button>
          </Card>
        </div>
      </div>
      <BottomNav active="circles" onNavigate={onNavigate} />
    </Shell>
  );
}
