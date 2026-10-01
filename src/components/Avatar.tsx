// src/components/Avatar.tsx

interface AvatarProps {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}

function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase();
}

export default function Avatar({ name, src, size = 40, className = "" }: AvatarProps) {
  const style = { width: size, height: size };

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={style}
        className={["rounded-full object-cover shrink-0", className].join(" ")}
      />
    );
  }

  return (
    <div
      style={style}
      className={[
        "flex shrink-0 items-center justify-center rounded-full bg-ajo-orange-tint font-sans font-semibold text-ajo-orange-dark",
        className,
      ].join(" ")}
    >
      <span style={{ fontSize: size * 0.38 }}>{initialsFor(name)}</span>
    </div>
  );
}
