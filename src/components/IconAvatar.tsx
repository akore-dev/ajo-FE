// src/components/IconAvatar.tsx
import { ReactNode } from "react";

interface IconAvatarProps {
  icon: ReactNode;
  size?: number;
  tone?: "orange" | "green";
}

export default function IconAvatar({ icon, size = 40, tone = "orange" }: IconAvatarProps) {
  const toneClasses = tone === "green" ? "bg-ajo-green-tint text-ajo-green" : "bg-ajo-orange-tint text-ajo-orange-dark";

  return (
    <div
      style={{ width: size, height: size }}
      className={["flex shrink-0 items-center justify-center rounded-full", toneClasses].join(" ")}
    >
      {icon}
    </div>
  );
}
