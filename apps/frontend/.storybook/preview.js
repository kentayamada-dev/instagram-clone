import { customizedTheme } from "../src/libs/chakra";
import { RouterContext } from "next/dist/shared/lib/router-context";

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
