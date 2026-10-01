"use client";

// src/screens/OnboardingScreen.tsx
import Button from "../components/Button";
import Shell from "../components/Shell";

interface OnboardingScreenProps {
  onGetStarted?: () => void;
  onSignIn?: () => void;
  /** Swap in a real photo of people together — defaults to a placeholder path. */
  heroImageUrl?: string;
}

export default function OnboardingScreen({
  onGetStarted,
  onSignIn,
  heroImageUrl = "/images/onboarding-hero.jpg",
}: OnboardingScreenProps) {
  return (
    <Shell outerClassName="bg-ajo-ink" className="bg-ajo-ink relative">
      {/* Hero photo, full-bleed */}
      <div className="absolute inset-0">
        <img
          src={heroImageUrl}
          alt=""
          role="presentation"
          className="h-full w-full object-cover opacity-80"
        />
        {/* Warm scrim so white text stays legible over any photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-ajo-ink/10 via-ajo-ink/40 to-ajo-ink" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-1 flex-col justify-between px-6 pt-8 pb-8">
        <div className="relative inline-flex w-fit items-center gap-1.5">
          <span className="font-display text-2xl font-semibold text-white">Ajo</span>
          <span className="h-1.5 w-1.5 rounded-full bg-ajo-orange" aria-hidden="true" />
          <svg aria-hidden="true" width="20" height="24" viewBox="0 0 20 24" className="pointer-events-none absolute -right-1 top-0">
            <line x1="16" y1="2" x2="4" y2="20" stroke="#E96A2C" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Decorative squiggly thread, top-right — signature accent from the original mark */}
        <svg
          aria-hidden="true"
          width="90"
          height="200"
          viewBox="0 0 90 200"
          className="pointer-events-none absolute right-4 top-16 opacity-70"
        >
          <path
            d="M85 5C70 20 60 35 68 48C76 61 55 65 48 78C41 91 60 98 55 112C50 126 30 128 32 145C34 162 15 170 20 190"
            stroke="#E96A2C"
            strokeWidth="1.2"
            fill="none"
            opacity="0.8"
          />
        </svg>

        <div className="mt-auto">
          <h1 className="font-display text-[38px] leading-[1.08] font-semibold text-white max-w-[280px]">
            Together today, more tomorrow.
          </h1>
          <p className="mt-4 max-w-[300px] text-[15px] leading-relaxed text-white/70">
            Save, contribute, and take your turn — with people you trust.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <Button variant="primary" onClick={onGetStarted}>
              Get started
            </Button>
            <button
              type="button"
              onClick={onSignIn}
              className="text-center text-[14px] font-medium text-white/85 underline underline-offset-4"
            >
              I already have an account
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}
