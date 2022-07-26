import { myTheme } from "../src/libs/chakra";
import { RouterContext } from "next/dist/shared/lib/router-context";
import * as NextImage from "next/image";
import i18n from "./i18next.js";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />
});

export const parameters = {
  i18n,
  locale: "en",
  locales: {
    en: "English",
    ja: "日本語"
  },
  layout: "centered",
  actions: { argTypesRegex: "^handle[A-Z].*" },
  chakra: {
    theme: myTheme
  },
  nextRouter: {
    Provider: RouterContext.Provider
  }
};
