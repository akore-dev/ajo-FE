// src/components/StepIndicator.tsx

interface StepIndicatorProps {
  total: number;
  current: number; // 1-indexed
}

export default function StepIndicator({ total, current }: StepIndicatorProps) {
  return (
    <div className="flex items-center" aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }, (_, i) => i + 1).map((step, i) => (
        <div key={step} className="flex flex-1 items-center last:flex-none">
          <div
            className={[
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold",
              step === current
                ? "bg-ajo-orange text-white"
                : step < current
                ? "bg-ajo-orange-tint text-ajo-orange-dark"
                : "border border-ajo-border text-ajo-text-faint",
            ].join(" ")}
          >
            {step}
          </div>
          {i < total - 1 && (
            <div className="mx-1 h-px flex-1 border-t border-dashed border-ajo-border" />
          )}
        </div>
      ))}
    </div>
  );
}
