// src/components/Logo.tsx
interface LogoProps {
  tone?: "dark" | "light";
  className?: string;
}

/** The "Ajo" wordmark with its orange dot + diagonal accent slash, used on auth and splash screens. */
export default function Logo({ tone = "dark", className = "" }: LogoProps) {
  return (
    <div className={["relative inline-flex items-center gap-1.5", className].join(" ")}>
      <span
        className={[
          "font-display text-2xl font-semibold",
          tone === "dark" ? "text-ajo-text" : "text-white",
        ].join(" ")}
      >
        Ajo
      </span>
      <span className="h-1.5 w-1.5 rounded-full bg-ajo-orange" aria-hidden="true" />
      {/* Diagonal accent slash cutting through the wordmark, echoing the original mark */}
      <svg
        aria-hidden="true"
        width="20"
        height="24"
        viewBox="0 0 20 24"
        className="pointer-events-none absolute -right-1 top-0"
      >
        <line x1="16" y1="2" x2="4" y2="20" stroke="#E96A2C" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
