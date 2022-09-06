import type { LocaleType } from "../next/types";
import type { NextRouter } from "next/router";

export type UseLocaleType = <EnType = unknown, JaType = unknown>(en: EnType, ja: JaType) => EnType | JaType;

export type ChangeLocaleType = (router: NextRouter, locale: LocaleType) => void;
