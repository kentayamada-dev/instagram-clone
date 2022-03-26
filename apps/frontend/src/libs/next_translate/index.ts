import useTranslation from "next-translate/useTranslation";
import type { TranslationKeys, TypeSafeTranslate } from "./types";

export const useTypeSafeTranslation = <T extends keyof TranslationKeys>(
  namespace: T
): TypeSafeTranslate<T> => useTranslation(namespace);
