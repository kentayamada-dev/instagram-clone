export type UseDebounceReturnType = (fn: () => void) => void;

export type UseDebounceType = (timeout: number) => UseDebounceReturnType;
