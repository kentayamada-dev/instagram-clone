/* eslint @typescript-eslint/naming-convention: "off", @typescript-eslint/prefer-ts-expect-error: "off", @typescript-eslint/ban-ts-comment: "off", @typescript-eslint/indent:"off"*/

// @ts-ignore
import type common from "../../../public/locales/en/common.json";
// @ts-ignore
import type form from "../../../public/locales/en/form.json";

type Join<S1, S2> = S1 extends string
  ? S2 extends string
    ? `${S1}.${S2}`
    : never
  : never;

type Paths<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? Join<K, Paths<T[K]>>
    : K;
}[keyof T];

export type TranslationKeys = {
  common: Paths<typeof common>;
  form: Paths<typeof form>;
};

export type TypeSafeTranslate<T extends keyof TranslationKeys> = {
  t: (key: TranslationKeys[T]) => string;
};
