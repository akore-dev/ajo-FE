// src/components/Shell.tsx
import { ReactNode } from "react";

interface ShellProps {
  children: ReactNode;
  /** Background applied to the OUTER viewport, behind the phone canvas. */
  outerClassName?: string;
  /** Background applied to the screen canvas itself. */
  className?: string;
}

/**
 * Every screen is authored mobile-first at a 430px canvas width (iPhone-ish).
 * On wider viewports (web), the canvas centers with a soft frame instead of
 * stretching content edge-to-edge, so the same component works on a phone
 * and inside a browser tab.
 */
export default function Shell({ children, outerClassName = "", className = "" }: ShellProps) {
  return (
    <div
      className={[
        "min-h-screen w-full flex justify-center bg-ajo-cream-dim sm:py-8",
        outerClassName,
      ].join(" ")}
    >
      <div
        className={[
          "w-full max-w-[430px] min-h-screen sm:min-h-[880px] sm:rounded-[32px] sm:shadow-2xl",
          "flex flex-col overflow-hidden bg-ajo-cream",
          className,
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}

