import { formatDistanceToNowStrict, format } from "date-fns";
import { ja, enUS } from "date-fns/locale";
import type { GetDateTimeType } from "./types";

const ONE_WEEK_IN_SEC = 604800;

export const getDateTime: GetDateTimeType = (date, locale) => {
  const createdAtDate = new Date(date);
  const fnsLocale = locale === "ja" ? ja : enUS;
  const dateInSec = Number(formatDistanceToNowStrict(createdAtDate, { unit: "second" }).replace(/\D/gu, ""));
  if (dateInSec > ONE_WEEK_IN_SEC) {
    return format(createdAtDate, locale === "ja" ? "yyyy年MM月dd日" : "MMMM d, yyyy", {
      locale: fnsLocale
    });
  }

  return formatDistanceToNowStrict(createdAtDate, {
    addSuffix: true,
    locale: fnsLocale
  });
};
