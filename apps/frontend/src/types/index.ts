export type NeverType<T> = {
  [P in keyof T]?: never;
};
