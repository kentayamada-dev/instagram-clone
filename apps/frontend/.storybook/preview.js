import { customizedTheme } from "../src/libs/chakra";
import { RouterContext } from "next/dist/shared/lib/router-context";
import * as NextImage from "next/image";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />
});

export const parameters = {
  layout: "fullscreen",
  actions: { argTypesRegex: "^handle[A-Z].*" },
  chakra: {
    theme: customizedTheme
  },
  nextRouter: {
    Provider: RouterContext.Provider
  }
};
