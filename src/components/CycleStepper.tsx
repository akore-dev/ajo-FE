// src/components/CycleStepper.tsx

interface CycleStepperProps {
  total: number;
  current: number;
}

export default function CycleStepper({ total, current }: CycleStepperProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1" aria-label={`Cycle ${current} of ${total}`}>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => {
        const isCurrent = n === current;
        const isDone = n < current;
        return (
          <div
            key={n}
            className={[
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold",
              isCurrent
                ? "bg-ajo-orange text-white"
                : isDone
                ? "bg-ajo-green-tint text-ajo-green"
                : "bg-ajo-cream-dim text-ajo-text-faint",
            ].join(" ")}
          >
            {String(n).padStart(2, "0")}
          </div>
        );
      })}
    </div>
  );
}
