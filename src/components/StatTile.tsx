import { useEffect, useRef, useState } from "react";

type Props = {
  label: string;
  value: number;
  unit: string;
  integer?: boolean;
};

const StatTile = ({ label, value, unit, integer = false }: Props) => {
  const numericValue = Number(value);
  const safeValue = Number.isFinite(numericValue) ? numericValue : 0;

  const [displayValue, setDisplayValue] = useState(0);
  const previousValueRef = useRef(0);

  useEffect(() => {
    const startValue = previousValueRef.current;
    const endValue = safeValue;
    const duration = 900;
    const startTime = performance.now();

    let animationFrame: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutCubic: fast at the beginning, smooth at the end
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const nextValue =
        startValue + (endValue - startValue) * easedProgress;

      setDisplayValue(nextValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
        previousValueRef.current = endValue;
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [safeValue]);

  const formattedValue = integer
    ? Math.round(displayValue).toLocaleString()
    : displayValue.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      });

  return (
    <div className="flex-1 min-w-0 py-4 px-5 rounded-xl border border-neutral-800 bg-neutral-950/50 backdrop-blur-sm">
      <div className="mb-2">
        <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-500">
          {label}
        </span>
      </div>

      <div className="flex items-baseline gap-2 min-w-0">
        <span className="text-2xl sm:text-3xl font-semibold tracking-tight tabular-nums text-white truncate">
          {formattedValue}
        </span>

        {unit && (
          <span className="text-xs font-medium text-neutral-500 whitespace-nowrap">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatTile;