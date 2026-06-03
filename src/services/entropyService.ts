import { SelectedCategories } from "../interfaces";
import { POOL_SIZES } from "./passwordConstants";

export function computeEntropy(
  length: number,
  categories: SelectedCategories,
): number {
  if (length <= 0) return 0;

  let poolSize = 0;
  if (categories.useLowerCase) poolSize += POOL_SIZES.useLowerCase;
  if (categories.useUpperCase) poolSize += POOL_SIZES.useUpperCase;
  if (categories.useNumbers) poolSize += POOL_SIZES.useNumbers;
  if (categories.useSymbols) poolSize += POOL_SIZES.useSymbols;

  if (poolSize === 0) return 0;

  return length * Math.log2(poolSize);
}
