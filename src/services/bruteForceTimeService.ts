/**
 * Converts entropy (in bits) to estimated brute-force crack time.
 *
 * Uses log-space arithmetic to avoid Number overflow at high entropy values.
 * ATTEMPTS_PER_SECOND = 1e15 (~massive GPU cluster, fast hash like MD5).
 * For slow hashes (bcrypt, Argon2) the real-world time would be orders of
 * magnitude higher — this is a worst-case scenario.
 */
export function computeBruteForceTime(entropy: number): {
  time: number;
  unit: string;
} {
  const ATTEMPTS_PER_SECOND = 1e15; // GPU-cluster attack rate (fast hash)
  const SECONDS_IN_YEAR = 86_400 * 365.25;

  if (entropy <= 0) {
    return { time: 0, unit: "" };
  }

  // Work in log-space: log2(attempts) = entropy
  // log10(seconds) = entropy * log10(2) - log10(ATTEMPTS_PER_SECOND)
  const LOG10_2 = Math.LN2 / Math.LN10;
  const log10Seconds = entropy * LOG10_2 - Math.log10(ATTEMPTS_PER_SECOND);

  // Convert to years for the initial comparison
  const log10Years = log10Seconds - Math.log10(SECONDS_IN_YEAR);

  // Cap extremely high values early to avoid downstream issues
  if (log10Years > 11) {
    // > 100 billion years — display the easter egg
    return { time: 42, unit: "googol :)" };
  }

  // Convert back from log-space only for the final value
  let seconds = Math.pow(10, log10Seconds);
  let years = seconds / SECONDS_IN_YEAR;

  // Pick the most human-readable unit by cascading down from years
  const conversions = [
    { unit: "years", value: years },
    { unit: "days", value: years * 365.25 },
    { unit: "hours", value: years * 365.25 * 24 },
    { unit: "minutes", value: years * 365.25 * 24 * 60 },
    { unit: "seconds", value: seconds },
    { unit: "milliseconds", value: seconds * 1000 },
    { unit: "microseconds", value: seconds * 1e6 },
    { unit: "nanoseconds", value: seconds * 1e9 },
    { unit: "picoseconds", value: seconds * 1e12 },
    { unit: "femtoseconds", value: seconds * 1e15 },
    { unit: "attoseconds", value: seconds * 1e18 },
  ];

  let time = 0;
  let unit = "attoseconds";
  for (const conv of conversions) {
    if (conv.value >= 1.0) {
      time = conv.value;
      unit = conv.unit;
      break;
    }
  }

  // Multi-year human units
  if (unit === "years") {
    if (time >= 1000) {
      time /= 1000;
      unit = "millennia";
    } else if (time >= 100) {
      time /= 100;
      unit = "centuries";
    } else if (time >= 10) {
      time /= 10;
      unit = "decades";
    }
  }

  if (unit === "millennia" && time >= 1_000_000) {
    return { time: 42, unit: "googol :)" };
  }

  return { time, unit };
}
