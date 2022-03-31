/* eslint-disable @typescript-eslint/indent */
export type StrictPropertyCheck<T, TExpected, TError> = T &
  (Exclude<keyof T, keyof TExpected> extends never
    ? Record<never, never>
    : TError);
/* eslint-enable @typescript-eslint/indent */
