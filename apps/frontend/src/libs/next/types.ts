/* eslint @typescript-eslint/naming-convention: "off", @typescript-eslint/ban-types: "off"*/
import type { NextPage } from "next";
import type { SSRConfig } from "next-i18next";
import type { AppProps } from "next/app";

type MyPageProps<T = {}> = Partial<SSRConfig & T>;

export type NextPageWithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: JSX.Element, props: MyPageProps<T>) => JSX.Element;
};

type MyAppProps = Omit<AppProps<MyPageProps>, "pageProps"> & {
  pageProps: MyPageProps;
};

type MyAppPropsWithLayout = MyAppProps & {
  Component: NextPageWithLayout;
};

export type MyAppType = (props: MyAppPropsWithLayout) => JSX.Element;

export type MyPathsType<T> = {
  locale: "en" | "ja";
  params: T;
};
