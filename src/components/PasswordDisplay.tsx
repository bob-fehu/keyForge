import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getCharColor } from "@/lib/colors";

type Props = { password: string };

const PasswordDisplay = ({ password }: Props) => {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const handleCopy = async () => {
    if (!password) return;
    setCopyError(false);
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
    } catch {
      // navigator.clipboard unavailable (e.g., non-secure context).
      // execCommand("copy") is deprecated and unreliable — show error instead.
      setCopyError(true);
      setTimeout(() => setCopyError(false), 2000);
    }
  };

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800">
      <div className="flex-1 min-h-[2.5rem] flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          {password ? (
            <motion.div
              key={password}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-lg sm:text-xl font-medium tracking-wider break-all leading-relaxed select-all"
              aria-live="polite"
              aria-atomic="true"
            >
              {password.split("").map((char, i) => (
                <span key={i} style={{ color: getCharColor(char) }}>
                  {char}
                </span>
              ))}
            </motion.div>
          ) : (
            <motion.span
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-neutral-600 font-normal tracking-normal"
            >
              Click Generate to create a password
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            disabled={!password}
            aria-label="Copy password"
            className="shrink-0 text-neutral-500 hover:text-white"
          >
            {copyError ? (
              <span className="text-xs text-red-400">!</span>
            ) : copied ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {copyError
            ? "Copy failed — select manually"
            : copied
              ? "Copied"
              : "Copy"}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default PasswordDisplay;
