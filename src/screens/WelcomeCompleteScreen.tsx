"use client";

// src/screens/WelcomeCompleteScreen.tsx
import Shell from "../components/Shell";
import Button from "../components/Button";
import SuccessBadge from "../components/SuccessBadge";
import Logo from "../components/Logo";

interface WelcomeCompleteScreenProps {
  onGoToHome?: () => void;
  heroImageUrl?: string;
}

export default function WelcomeCompleteScreen({
  onGoToHome,
  heroImageUrl = "/images/welcome-hero.jpg",
}: WelcomeCompleteScreenProps) {
  return (
    <Shell outerClassName="bg-ajo-ink" className="bg-ajo-ink relative">
      <div className="absolute inset-0">
        <img src={heroImageUrl} alt="" role="presentation" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-ajo-ink/30 via-ajo-ink/50 to-ajo-ink" />
      </div>

      <div className="relative z-10 flex h-full flex-1 flex-col items-center justify-center px-6 text-center">
        <SuccessBadge variant="glow" />

        <h1 className="mt-6 font-display text-[26px] font-semibold text-white">Welcome to Ajo!</h1>
        <p className="mt-3 max-w-[280px] text-[15px] text-white/75">
          You&apos;re all set. Start your journey and take your turn.
        </p>

        <Button variant="primary" className="mt-8" onClick={onGoToHome}>
          Go to home
        </Button>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3 px-6 pb-8">
        <p className="text-[13px] text-white/60">Together today, more tomorrow.</p>
        <Logo tone="light" />
      </div>
    </Shell>
  );
}
