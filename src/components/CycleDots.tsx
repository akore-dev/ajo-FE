// src/components/CycleDots.tsx

interface CycleDotsProps {
  total: number;
  completed: number;
  /** Cap how many dots render before falling back to a compact count. */
  maxDots?: number;
}

export default function CycleDots({ total, completed, maxDots = 10 }: CycleDotsProps) {
  const dotCount = Math.min(total, maxDots);

  return (
    <div className="flex items-center gap-1" aria-label={`Cycle ${completed} of ${total}`}>
      {Array.from({ length: dotCount }).map((_, i) => (
        <span
          key={i}
          className={[
            "h-1.5 w-1.5 rounded-full",
            i < completed ? "bg-ajo-orange" : "bg-ajo-border",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
