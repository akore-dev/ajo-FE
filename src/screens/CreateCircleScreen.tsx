"use client";

// src/screens/CreateCircleScreen.tsx
import { useState } from "react";
import { ArrowLeft, Users, Users2, Building2, Sparkles } from "lucide-react";
import Shell from "../components/Shell";
import StepIndicator from "../components/StepIndicator";
import SelectableRow from "../components/SelectableRow";
import Button from "../components/Button";
import type { CircleCategory } from "../types";

interface CreateCircleScreenProps {
  totalSteps?: number;
  currentStep?: number;
  onBack?: () => void;
  onNext?: (category: CircleCategory) => void;
}

const categories: { value: CircleCategory; label: string; icon: React.ReactNode }[] = [
  { value: "family", label: "Family", icon: <Users size={20} /> },
  { value: "friends", label: "Friends", icon: <Users2 size={20} /> },
  { value: "community", label: "Community", icon: <Building2 size={20} /> },
  { value: "other", label: "Something else", icon: <Sparkles size={20} /> },
];

export default function CreateCircleScreen({
  totalSteps = 4,
  currentStep = 1,
  onBack,
  onNext,
}: CreateCircleScreenProps) {
  const [category, setCategory] = useState<CircleCategory>("family");

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
          <h1 className="font-display text-[16px] font-semibold text-ajo-text">Create a Circle</h1>
        </div>

        <div className="mt-5">
          <StepIndicator total={totalSteps} current={currentStep} />
        </div>

        <h2 className="mt-6 text-[17px] font-semibold text-ajo-text">
          What are you saving together for?
        </h2>

        <div className="mt-6 flex flex-col gap-3">
          {categories.map((c) => (
            <SelectableRow
              key={c.value}
              icon={c.icon}
              label={c.label}
              selected={category === c.value}
              onClick={() => setCategory(c.value)}
            />
          ))}
        </div>

        <Button variant="primary" className="mt-auto" onClick={() => onNext?.(category)}>
          Next
        </Button>
      </div>
    </Shell>
  );
}
