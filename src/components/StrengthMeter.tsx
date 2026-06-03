type Props = { entropy: number };

const STRENGTH_CONFIG = [
  { max: 40, label: "Very weak" },
  { max: 60, label: "Weak" },
  { max: 80, label: "Fair" },
  { max: 100, label: "Strong" },
  { max: Infinity, label: "Excellent" },
];

const SEGMENTS = 5;

function getStrength(entropy: number) {
  if (entropy <= 0) return { label: "—", filled: 0 };
  const config =
    STRENGTH_CONFIG.find((s) => entropy < s.max) ??
    STRENGTH_CONFIG[STRENGTH_CONFIG.length - 1];
  const idx = STRENGTH_CONFIG.indexOf(config);
  return {
    label: config.label,
    filled: Math.min(idx + 1, SEGMENTS),
  };
}

const StrengthMeter = ({ entropy }: Props) => {
  const { label, filled } = getStrength(entropy);

  return (
    <div
      role="meter"
      aria-valuenow={filled}
      aria-valuemin={0}
      aria-valuemax={SEGMENTS}
      aria-valuetext={label}
      aria-label="Password strength"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-500">
          Strength
        </span>
        <span className="text-[10px] font-medium text-neutral-300">
          {label}
        </span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i < filled
                ? "bg-white"
                : "bg-neutral-800"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default StrengthMeter;
