// src/components/Card.tsx
import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padded?: boolean;
}

export default function Card({ children, padded = true, className = "", ...rest }: CardProps) {
  return (
    <div
      className={[
        "rounded-card bg-ajo-card shadow-card border border-ajo-border/60",
        padded ? "p-5" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}
