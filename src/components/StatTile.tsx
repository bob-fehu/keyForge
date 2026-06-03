import CountUp from "react-countup";

type Props = {
  label: string;
  value: number;
  unit: string;
  integer?: boolean;
};

const StatTile = ({
  label,
  value,
  unit,
  integer = false,
}: Props) => {
  return (
    <div className="flex-1 min-w-0 py-4 px-5 rounded-xl border border-neutral-800 bg-neutral-950/50 backdrop-blur-sm">
      <div className="mb-2">
        <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-500">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-2 min-w-0">
        <CountUp
          start={0}
          end={value}
          duration={1.2}
          decimals={integer ? 0 : 2}
          preserveValue
        >
          {({ countUpRef }) => (
            <span
              ref={countUpRef as React.Ref<HTMLSpanElement>}
              className="text-2xl sm:text-3xl font-semibold tracking-tight tabular-nums text-white truncate"
            />
          )}
        </CountUp>
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
