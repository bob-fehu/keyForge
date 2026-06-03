export const CHAR_SETS = {
  useNumbers: "0123456789",
  useLowerCase: "abcdefghijklmnopqrstuvwxyz",
  useUpperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  useSymbols: "!#$%&'()*+,-./:;<=>?@[]^_`{|}~",
} as const;

export const POOL_SIZES = {
  useNumbers: CHAR_SETS.useNumbers.length,
  useLowerCase: CHAR_SETS.useLowerCase.length,
  useUpperCase: CHAR_SETS.useUpperCase.length,
  useSymbols: CHAR_SETS.useSymbols.length,
} as const;
