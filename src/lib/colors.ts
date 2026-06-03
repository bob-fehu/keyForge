// Color mapping for character categories
export const CHAR_COLORS = {
  lowercase: "#06b6d4", // cyan-500
  uppercase: "#3b82f6", // blue-500
  number: "#10b981",    // emerald-500
  symbol: "#f59e0b",    // amber-500
} as const;

export function getCharColor(char: string): string {
  if (/[a-z]/.test(char)) return CHAR_COLORS.lowercase;
  if (/[A-Z]/.test(char)) return CHAR_COLORS.uppercase;
  if (/\d/.test(char)) return CHAR_COLORS.number;
  return CHAR_COLORS.symbol;
}
