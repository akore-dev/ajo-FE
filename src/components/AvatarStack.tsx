// src/components/AvatarStack.tsx
import Avatar from "./Avatar";

interface AvatarStackProps {
  names: string[];
  avatarUrls?: (string | undefined)[];
  max?: number;
  size?: number;
}

export default function AvatarStack({ names, avatarUrls = [], max = 5, size = 32 }: AvatarStackProps) {
  const visible = names.slice(0, max);
  const overflow = names.length - visible.length;

  return (
    <div className="flex items-center">
      {visible.map((name, i) => (
        <div key={i} style={{ marginLeft: i === 0 ? 0 : -size * 0.3 }} className="rounded-full ring-2 ring-white">
          <Avatar name={name} src={avatarUrls[i]} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          style={{ marginLeft: -size * 0.3, width: size, height: size }}
          className="flex items-center justify-center rounded-full bg-ajo-ink-soft text-[11px] font-semibold text-white ring-2 ring-white"
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
