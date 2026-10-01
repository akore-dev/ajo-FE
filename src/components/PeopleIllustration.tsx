// src/components/PeopleIllustration.tsx

interface PeopleIllustrationProps {
  size?: number;
}

/**
 * Flat-design illustration of three people standing together, on a soft
 * radial glow — used on empty states like "No circles yet" to keep the
 * warm, human tone consistent with the rest of the product.
 */
export default function PeopleIllustration({ size = 140 }: PeopleIllustrationProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 140 140" aria-hidden="true">
      <defs>
        <radialGradient id="peopleGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#FBE4D3" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FBE4D3" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="70" cy="65" rx="62" ry="55" fill="url(#peopleGlow)" />

      {/* Left person — rust top */}
      <circle cx="42" cy="52" r="12" fill="#C8541D" />
      <path d="M22 100C22 78 30 66 42 66C54 66 62 78 62 100Z" fill="#C8541D" />

      {/* Center person — orange/yellow top, slightly taller/forward */}
      <circle cx="70" cy="46" r="14" fill="#2A241E" />
      <path d="M46 104C46 78 56 64 70 64C84 64 94 78 94 104Z" fill="#E96A2C" />

      {/* Right person — blue top */}
      <circle cx="98" cy="52" r="12" fill="#2A241E" />
      <path d="M78 100C78 78 86 66 98 66C110 66 118 78 118 100Z" fill="#3B5B7A" />
    </svg>
  );
}
