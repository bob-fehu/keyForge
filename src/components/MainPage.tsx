import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

import Starfield from "@/components/Starfield";
import KeyForgeLogo from "@/components/KeyForgeLogo";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PasswordDisplay from "@/components/PasswordDisplay";
import StrengthMeter from "@/components/StrengthMeter";
import CharacterChips from "@/components/CharacterChips";
import StatTile from "@/components/StatTile";
import InfoSection from "@/components/InfoSection";
import type { SelectedCategories } from "@/interfaces";
import { generatePassword } from "@/services/passwordService";
import { computeEntropy } from "@/services/entropyService";
import { computeBruteForceTime } from "@/services/bruteForceTimeService";

type GeneratedData = {
  password: string;
  entropy: number;
  bruteForceTime: { time: number; unit: string };
};

const DEFAULT_CATEGORIES: SelectedCategories = {
  useLowerCase: true,
  useUpperCase: true,
  useNumbers: true,
  useSymbols: true,
};

const MIN_LENGTH = 4;
const MAX_LENGTH = 64;

const MainPage = () => {
  const [length, setLength] = useState<number[]>([16]);
  const [categories, setCategories] =
    useState<SelectedCategories>(DEFAULT_CATEGORIES);
  const [data, setData] = useState<GeneratedData | null>(null);

  const passwordLength = length[0];

  const selectedCount = useMemo(
    () => Object.values(categories).filter(Boolean).length,
    [categories],
  );

  const noCategoriesSelected = selectedCount === 0;
  const lengthTooShort = passwordLength < selectedCount;
  const canGenerate = !noCategoriesSelected && !lengthTooShort;

  const disabledReason = noCategoriesSelected
    ? "Select at least one character type"
    : lengthTooShort
      ? "Increase length to include all selected types"
      : "";

  const handleGenerate = () => {
    if (!canGenerate) return;
    const password = generatePassword(passwordLength, categories);
    const entropy = computeEntropy(passwordLength, categories);
    const bruteForceTime = computeBruteForceTime(entropy);
    setData({ password, entropy, bruteForceTime });
  };

  const liveEntropy = useMemo(
    () => computeEntropy(passwordLength, categories),
    [passwordLength, categories],
  );
  const liveBruteForceTime = useMemo(
    () => computeBruteForceTime(liveEntropy),
    [liveEntropy],
  );

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      <Starfield />

      <main className="relative z-10 flex flex-col items-center px-6 sm:px-10 pt-8 pb-20">
        {/* Hero */}
        <div className="text-center pt-8 pb-12">
          <div className="flex justify-center mb-5">
            <KeyForgeLogo className="w-12 h-12" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-white mb-4">
            KeyForge
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 max-w-md mx-auto">
            Generate strong passwords. See how long they would take to crack.
          </p>
        </div>

        {/* Generator Card */}
        <div className="w-full max-w-xl rounded-2xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-xl p-6 sm:p-8 flex flex-col gap-7">
          <PasswordDisplay password={data?.password ?? ""} />

          <StrengthMeter entropy={liveEntropy} />

          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-500">
                Length
              </span>
              <span className="font-mono text-sm font-medium tabular-nums text-white">
                {passwordLength}
              </span>
            </div>
            <Slider
              value={length}
              min={MIN_LENGTH}
              max={MAX_LENGTH}
              step={1}
              onValueChange={setLength}
              className="py-2"
              aria-label="Password length"
            />
            <div className="flex justify-between mt-1">
              <span className="text-[10px] font-mono text-neutral-600">
                {MIN_LENGTH}
              </span>
              <span className="text-[10px] font-mono text-neutral-600">
                {MAX_LENGTH}
              </span>
            </div>
          </div>

          <CharacterChips value={categories} onChange={setCategories} />

          <div className="flex justify-center pt-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    size="lg"
                    onClick={handleGenerate}
                    disabled={!canGenerate}
                    className="min-w-[200px] bg-white text-black hover:bg-neutral-200 font-semibold"
                  >
                    <RefreshCw className="h-4 w-4" />
                    {data ? "Regenerate" : "Generate"}
                  </Button>
                </span>
              </TooltipTrigger>
              {!canGenerate && (
                <TooltipContent>{disabledReason}</TooltipContent>
              )}
            </Tooltip>
          </div>
        </div>

        {/* Stats */}
        <div className="w-full max-w-xl flex flex-col sm:flex-row gap-3 mt-8">
          <StatTile
            label="Entropy"
            value={liveEntropy}
            unit="bits"
          />
          <StatTile
            label="Time to crack"
            value={liveBruteForceTime.time}
            unit={liveBruteForceTime.unit}
          />
        </div>
      </main>

      <InfoSection />

      <footer className="relative z-10 text-center py-5 text-xs text-neutral-600">
        Runs locally in your browser · Open source, MIT licensed
      </footer>
    </div>
  );
};

export default MainPage;
