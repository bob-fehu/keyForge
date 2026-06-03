import { cn } from "@/lib/utils";
import { CHAR_COLORS } from "@/lib/colors";
import type { SelectedCategories } from "@/interfaces";

type Category = keyof SelectedCategories;

const OPTIONS: { key: Category; range: string; label: string; color: string }[] = [
  { key: "useLowerCase", range: "a–z", label: "Lowercase", color: CHAR_COLORS.lowercase },
  { key: "useUpperCase", range: "A–Z", label: "Uppercase", color: CHAR_COLORS.uppercase },
  { key: "useNumbers", range: "0–9", label: "Numbers", color: CHAR_COLORS.number },
  { key: "useSymbols", range: "!@#", label: "Symbols", color: CHAR_COLORS.symbol },
];

type Props = {
  value: SelectedCategories;
  onChange: (next: SelectedCategories) => void;
};

const CharacterChips = ({ value, onChange }: Props) => {
  const toggle = (key: Category) => () =>
    onChange({ ...value, [key]: !value[key] });

  return (
    <div>
      <span className="block text-[10px] font-medium uppercase tracking-widest text-neutral-500 mb-3">
        Character types
      </span>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Character types"
      >
        {OPTIONS.map((opt) => {
          const active = value[opt.key];
          return (
            <button
              key={opt.key}
              type="button"
              onClick={toggle(opt.key)}
              aria-pressed={active}
              aria-label={`${opt.label} (${opt.range}), ${active ? "active" : "inactive"}`}
              className={cn(
                "inline-flex items-center gap-1.5 h-9 px-4 rounded-lg text-[13px] font-medium transition-all duration-200 cursor-pointer select-none border active:scale-95",
                active
                  ? "bg-transparent"
                  : "bg-transparent border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300",
              )}
              style={
                active
                  ? {
                      borderColor: opt.color,
                      color: opt.color,
                      boxShadow: `0 0 12px ${opt.color}33`,
                    }
                  : undefined
              }
            >
              <span className="font-mono font-semibold">{opt.range}</span>
              <span className="opacity-70 text-xs">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterChips;
