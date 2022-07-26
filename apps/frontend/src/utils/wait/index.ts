import type { WaitType } from "./types";

export const wait: WaitType = async (sec) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, sec * 1000);
  });
