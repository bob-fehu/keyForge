import { SelectedCategories } from "../interfaces";
import { CHAR_SETS } from "./passwordConstants";

function getCategories(selectedCategories: SelectedCategories): string[] {
  const categories: string[] = [];
  if (selectedCategories.useNumbers) categories.push(CHAR_SETS.useNumbers);
  if (selectedCategories.useLowerCase)
    categories.push(CHAR_SETS.useLowerCase);
  if (selectedCategories.useUpperCase)
    categories.push(CHAR_SETS.useUpperCase);
  if (selectedCategories.useSymbols) categories.push(CHAR_SETS.useSymbols);
  return categories;
}

const MAX_UINT32 = 0xffffffff;
const randomBuf = new Uint32Array(1);

function secureRandomInt(max: number): number {
  if (max <= 0) throw new Error("max must be > 0");
  if (max === 1) return 0;

  const crypto = window.crypto;
  const limit = MAX_UINT32 - ((MAX_UINT32 % max) + 1) % max;

  while (true) {
    crypto.getRandomValues(randomBuf);
    if (randomBuf[0] <= limit) return randomBuf[0] % max;
  }
}

function getRandomCharacter(str: string): string {
  return str[secureRandomInt(str.length)];
}

function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function generatePassword(
  length: number,
  selectedCategories: SelectedCategories,
): string {
  const categories = getCategories(selectedCategories);

  if (categories.length === 0) {
    throw new Error("Select at least one character category.");
  }
  if (length < categories.length) {
    throw new Error(`Length must be at least ${categories.length}.`);
  }

  const allCharacters = categories.join("");

  const result: string[] = Array.from(
    { length: length - categories.length },
    () => getRandomCharacter(allCharacters),
  );

  for (const category of categories) {
    result.push(getRandomCharacter(category));
  }

  return shuffle(result).join("");
}
