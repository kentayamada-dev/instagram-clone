/* eslint @typescript-eslint/naming-convention: "off", @typescript-eslint/prefer-ts-expect-error: "off", @typescript-eslint/ban-ts-comment: "off", @typescript-eslint/indent:"off"*/

// @ts-ignore
import type common from "../../../public/locales/en/common.json";
// @ts-ignore
import type form from "../../../public/locales/en/form.json";
import type { I18n, Translate } from "next-translate";

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

type Tail<T> = T extends [unknown, ...infer Rest] ? Rest : never;

export type TypeSafeTranslate<T extends keyof TranslationKeys> = Omit<
  I18n,
  "t"
> & {
  t: (key: TranslationKeys[T], ...rest: Tail<Parameters<Translate>>) => string;
};
