// src/components/SuccessBadge.tsx
import { Check } from "lucide-react";

interface SuccessBadgeProps {
  size?: number;
  /** "confetti" scatters colored dots around the badge (default). "glow" shows a soft white ring instead — used for calmer, photo-backed success screens. */
  variant?: "confetti" | "glow";
  /** How far confetti dots scatter, relative to the badge. Increase for a fuller-screen celebratory burst. */
  spread?: number;
}

const confettiPositions = [
  { top: "-40%", left: "10%", color: "#E96A2C", size: 8 },
  { top: "-20%", left: "95%", color: "#1F8A5F", size: 6 },
  { top: "90%", left: "100%", color: "#E96A2C", size: 7 },
  { top: "100%", left: "0%", color: "#16233F", size: 6 },
  { top: "-55%", left: "55%", color: "#1F8A5F", size: 5 },
  { top: "60%", left: "-30%", color: "#E96A2C", size: 6 },
  { top: "-15%", left: "-25%", color: "#F5C453", size: 6 },
  { top: "40%", left: "110%", color: "#F5C453", size: 5 },
  { top: "105%", left: "45%", color: "#16233F", size: 5 },
];

export default function SuccessBadge({ size = 88, variant = "confetti", spread = 1.6 }: SuccessBadgeProps) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {variant === "confetti" &&
        confettiPositions.map((dot, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              top: `calc(50% + (${dot.top} - 50%) * ${spread})`,
              left: `calc(50% + (${dot.left} - 50%) * ${spread})`,
              width: dot.size,
              height: dot.size,
              backgroundColor: dot.color,
            }}
          />
        ))}

      {variant === "glow" && (
        <div
          aria-hidden="true"
          className="absolute inset-[-14%] rounded-full bg-white/30 blur-md"
        />
      )}

      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-ajo-green ring-4 ring-white/70">
        <Check size={size * 0.45} strokeWidth={3} className="text-white" />
      </div>
    </div>
  );
}
