import { useRouter } from "next/router";
import type { UseLocaleType } from "./types";

export const useLocale: UseLocaleType = (en, ja) => {
  const router = useRouter();
  const { locale } = router;

  return locale === "ja" ? ja : en;
};
