import { useTranslation } from "next-i18next";
import type { TranslationKeys, TypeSafeTranslate } from "./types";

export const useTypeSafeTranslation = <T extends keyof TranslationKeys>(
  namespace: T
): TypeSafeTranslate<T> => useTranslation(namespace);
