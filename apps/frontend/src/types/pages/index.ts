/* eslint @typescript-eslint/naming-convention: "off", @typescript-eslint/ban-types: "off"*/
import type { NextPage } from "next";
import type { AppProps } from "next/app";

export type NextPageWithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: JSX.Element) => JSX.Element;
};

export type MyAppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type MyAppType = (props: MyAppPropsWithLayout) => JSX.Element;
