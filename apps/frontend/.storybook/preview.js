import { myTheme } from "../src/libs/chakra";
import { RouterContext } from "next/dist/shared/lib/router-context";
import * as NextImage from "next/image";
import { MockedProvider } from "@apollo/client/testing";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />
});

export const parameters = {
  apolloClient: {
    MockedProvider
  },
  layout: "fullscreen",
  actions: { argTypesRegex: "^handle[A-Z].*" },
  chakra: {
    theme: myTheme
  },
  nextRouter: {
    Provider: RouterContext.Provider
  }
};
