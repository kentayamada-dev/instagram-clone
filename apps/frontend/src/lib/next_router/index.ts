import Cookies from "js-cookie";
import { useRouter } from "next/router";
import type { ChangeLocaleType, UseLocaleType } from "./types";

export const useLocale: UseLocaleType = (en, ja) => {
  const router = useRouter();
  const { locale } = router;

  return locale === "ja" ? ja : en;
};

export const changeLocale: ChangeLocaleType = (router, locale) => {
  const { asPath, pathname, query } = router;
  Cookies.set("NEXT_LOCALE", locale, { path: "/" });
  void router.push({ pathname, query }, asPath, {
    locale
  });
};
