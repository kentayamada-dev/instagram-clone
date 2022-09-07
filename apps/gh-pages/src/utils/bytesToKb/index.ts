import type { BytesToKbType } from "./types";

// eslint-disable-next-line no-mixed-operators
export const bytesToKb: BytesToKbType = (value) => Math.round((value / 1024) * 10 ** 2) / 10 ** 2;
