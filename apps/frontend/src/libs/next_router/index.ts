import { useRouter } from "next/router";

export const useLocale = <T = unknown, U = unknown>(en: T, ja: U): T | U => {
  const router = useRouter();
  const { locale } = router;

  return locale === "ja" ? ja : en;
};
