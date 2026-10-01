"use client";

// src/screens/NoCirclesScreen.tsx
import { ArrowLeft } from "lucide-react";
import Shell from "../components/Shell";
import EmptyState from "../components/EmptyState";
import PeopleIllustration from "../components/PeopleIllustration";
import Button from "../components/Button";
import BottomNav from "../components/BottomNav";
import type { NavRoute } from "../types";

interface NoCirclesScreenProps {
  onBack?: () => void;
  onCreateCircle?: () => void;
  onJoinCircle?: () => void;
  onNavigate?: (route: NavRoute) => void;
}

export default function NoCirclesScreen({ onBack, onCreateCircle, onJoinCircle, onNavigate }: NoCirclesScreenProps) {
  return (
    <Shell>
      <div className="flex items-center px-6 pt-8">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ajo-border bg-white"
        >
          <ArrowLeft size={18} className="text-ajo-text" />
        </button>
      </div>

      <EmptyState
        bareIcon
        icon={<PeopleIllustration />}
        title="No circles yet"
        subtitle="Create a circle or join one and see yourself something bigger."
        primaryAction={
          <Button variant="primary" onClick={onCreateCircle}>
            Create a circle
          </Button>
        }
        secondaryAction={
          <Button variant="outline" onClick={onJoinCircle}>
            Join a circle
          </Button>
        }
      />
      <BottomNav active="circles" onNavigate={onNavigate} />
    </Shell>
  );
}
