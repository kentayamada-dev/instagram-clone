/* eslint @typescript-eslint/naming-convention: "off", @typescript-eslint/ban-types: "off"*/
import type { NextPage } from "next";
import type { AppProps } from "next/app";

export type NextPageWithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: JSX.Element) => JSX.Element;
};

type MyAppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type MyAppType = (props: MyAppPropsWithLayout) => JSX.Element;

/* eslint-disable @typescript-eslint/indent */
export type MyPathsType<T> = {
  locale: "en" | "ja";
  params: T;
};
/* eslint-enable @typescript-eslint/indent */
