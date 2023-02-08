export type NeverType<Type> = {
  [P in keyof Type]?: never;
};
