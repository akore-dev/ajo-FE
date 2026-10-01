interface PositionWheelProps {
  total: number;
  current: number;
  sublabel?: string;
}

export default function PositionWheel({ total, current, sublabel }: PositionWheelProps) {
  const progress = total > 0 ? Math.min(current / total, 1) : 0;
  const circumference = 2 * Math.PI * 42;

  return (
    <div className="relative flex h-44 w-44 items-center justify-center">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-ajo-cream-dim)" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="var(--color-ajo-orange)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
        />
      </svg>
      <div className="absolute text-center">
        <p className="font-display text-[38px] font-semibold leading-none text-ajo-text">{String(current).padStart(2, "0")}</p>
        <p className="mt-1 text-[12px] font-medium text-ajo-text-muted">{sublabel ?? `of ${total}`}</p>
      </div>
    </div>
  );
}