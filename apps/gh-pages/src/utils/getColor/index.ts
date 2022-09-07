import type { GetColorType } from "./types";

export const getColor: GetColorType = (seed) =>
  // eslint-disable-next-line no-mixed-operators
  `#${Math.floor(((seed * 0.123 - 0 + 0.0002) / (1 - 0)) * 16777215).toString(16)}`;
