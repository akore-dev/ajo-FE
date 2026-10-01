"use client";

// src/screens/CirclesScreen.tsx
import { useState } from "react";
import { Plus, ChevronRight, Trophy } from "lucide-react";
import Shell from "../components/Shell";
import Card from "../components/Card";
import Avatar from "../components/Avatar";
import Badge from "../components/Badge";
import Tabs from "../components/Tabs";
import CycleDots from "../components/CycleDots";
import BottomNav from "../components/BottomNav";
import { formatNaira } from "../utils/format";
import type { Circle, NavRoute } from "../types";

type CirclesTab = "mine" | "available";

interface CirclesScreenProps {
  myCircles?: Circle[];
  availableCircles?: Circle[];
  onCreateCircle?: () => void;
  onOpenCircle?: (circleId: string) => void;
  onNavigate?: (route: NavRoute) => void;
}

const defaultMyCircles: Circle[] = [
  {
    id: "family",
    name: "Family Circle",
    category: "family",
    status: "active",
    memberCount: 10,
    capacity: 10,
    contributionAmount: 50000,
    currency: "₦",
    cadence: "monthly",
    currentCycle: 4,
    totalCycles: 10,
    membersPaidThisCycle: 4,
    poolTotal: 400000,
    poolTarget: 500000,
    nextPayoutMemberName: "You",
    nextPayoutAmount: 485000,
    cyclesUntilYourTurn: 0,
    yourPosition: 7,
    members: [],
  },
  {
    id: "friends",
    name: "Friends Circle",
    category: "friends",
    status: "active",
    memberCount: 8,
    capacity: 8,
    contributionAmount: 40000,
    currency: "₦",
    cadence: "monthly",
    currentCycle: 3,
    totalCycles: 8,
    membersPaidThisCycle: 3,
    poolTotal: 120000,
    poolTarget: 320000,
    nextPayoutMemberName: "Tolu",
    nextPayoutAmount: 320000,
    cyclesUntilYourTurn: 4,
    yourPosition: 5,
    members: [],
  },
  {
    id: "community",
    name: "Community Circle",
    category: "community",
    status: "recruiting",
    memberCount: 0,
    capacity: 12,
    contributionAmount: 60000,
    currency: "₦",
    cadence: "monthly",
    currentCycle: 0,
    totalCycles: 12,
    membersPaidThisCycle: 0,
    poolTotal: 0,
    poolTarget: 0,
    nextPayoutMemberName: "",
    nextPayoutAmount: 0,
    cyclesUntilYourTurn: 0,
    yourPosition: 0,
    members: [],
  },
];

export default function CirclesScreen({
  myCircles = defaultMyCircles,
  availableCircles = [],
  onCreateCircle,
  onOpenCircle,
  onNavigate,
}: CirclesScreenProps) {
  const [tab, setTab] = useState<CirclesTab>("mine");
  const circles = tab === "mine" ? myCircles : availableCircles;

  return (
    <Shell>
      <div className="flex flex-1 flex-col overflow-y-auto px-6 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-[24px] font-semibold text-ajo-text">Circles</h1>
          <button
            type="button"
            onClick={onCreateCircle}
            aria-label="Create a circle"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-ajo-orange text-white"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="mt-5">
          <Tabs
            tabs={[
              { value: "mine", label: "My Circles" },
              { value: "available", label: "Available" },
            ]}
            active={tab}
            onChange={setTab}
          />
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {circles.map((circle) => {
            const isRecruiting = circle.status === "recruiting";
            return (
              <button key={circle.id} type="button" onClick={() => onOpenCircle?.(circle.id)} className="text-left">
                <Card className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <Avatar name={circle.name} size={44} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[15px] font-semibold text-ajo-text">{circle.name}</h3>
                        <Badge status={circle.status} />
                      </div>
                      <p className="mt-0.5 text-[12px] text-ajo-text-muted">
                        {circle.capacity} members · {circle.cadence === "monthly" ? "Monthly" : "Weekly"}
                      </p>
                    </div>
                  </div>

                  {isRecruiting ? (
                    <div className="flex items-center justify-between pl-[52px] text-[13px]">
                      <span className="text-ajo-text-muted">
                        {circle.memberCount} / {circle.capacity} joined
                      </span>
                      <span className="font-semibold text-ajo-text">
                        {formatNaira(circle.contributionAmount)} / month
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between pl-[52px]">
                        <span className="text-[13px] text-ajo-text-muted">
                          Cycle {String(circle.currentCycle).padStart(2, "0")} / {circle.totalCycles}
                        </span>
                        <ChevronRight size={16} className="text-ajo-text-faint" />
                      </div>
                      <div className="flex items-center justify-between pl-[52px]">
                        <CycleDots total={circle.totalCycles} completed={circle.membersPaidThisCycle} />
                        <span className="text-[12px] text-ajo-text-faint">
                          {circle.membersPaidThisCycle}/{circle.capacity} paid
                        </span>
                      </div>
                      <div className="ml-[52px] flex items-center gap-1.5 text-[13px] font-medium text-ajo-text">
                        <Trophy size={14} className="text-ajo-text-muted" />
                        <span>
                          {circle.cyclesUntilYourTurn === 0 ? "Your turn" : `Next turn - ${circle.nextPayoutMemberName}`} ·{" "}
                          <span className="font-semibold text-ajo-orange">{formatNaira(circle.nextPayoutAmount)}</span>
                        </span>
                      </div>
                    </>
                  )}
                </Card>
              </button>
            );
          })}

          {circles.length === 0 && (
            <p className="mt-10 text-center text-[14px] text-ajo-text-muted">
              Nothing here yet.
            </p>
          )}
        </div>
      </div>

      <BottomNav active="circles" onNavigate={onNavigate} />
    </Shell>
  );
}
