import { theme } from "../src/lib/chakra";
import { RouterContext } from "next/dist/shared/lib/router-context";
import * as NextImage from "next/image";
import i18n from "./i18next.js";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { SWRConfig } from "swr";
import { request } from "graphql-request";
import { graphql } from "msw";
import { userNodes } from "../src/lib/faker";
import "@fontsource/noto-sans-jp";

const fetcher = (query) => request("/", query);

initialize({
  onUnhandledRequest: "bypass"
});

export const decorators = [
  mswDecorator,
  (Story) => (
    <SWRConfig
      value={{
        fetcher,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnMount: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false
      }}
    >
      {Story()}
    </SWRConfig>
  )
];

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />
});

export const parameters = {
  controls: {
    matchers: {
      date: /(createdAt|updatedAt)$/i
    }
  },
  i18n,
  locale: "en",
  locales: {
    en: "English",
    ja: "日本語"
  },
  layout: "centered",
  actions: { argTypesRegex: "^handle[A-Z].*" },
  chakra: {
    theme
  },
  nextRouter: {
    Provider: RouterContext.Provider
  },
  msw: {
    handlers: {
      search: [
        graphql.query("UsersFilter", (_req, res, ctx) =>
          res(
            ctx.data({
              users: { nodes: userNodes }
            })
          )
        )
      ]
    }
  }
};
