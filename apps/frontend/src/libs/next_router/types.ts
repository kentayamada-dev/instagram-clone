import type { LocaleType } from "../next/types";
import type { NextRouter } from "next/router";

export type UseLocaleType = <T = unknown, U = unknown>(en: T, ja: U) => T | U;

export type ChangeLocaleType = (router: NextRouter, locale: LocaleType) => void;
