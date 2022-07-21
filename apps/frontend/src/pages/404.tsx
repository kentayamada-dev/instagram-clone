import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "../components/organisms/Layout";
import { Custom404Template } from "../components/templates/Custom404Template";
import type { NextPageWithLayout } from "../types/pages";
import type { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale = "en" }) => {
  const initialLocale = locale ?? defaultLocale;

  return {
    props: {
      ...(await serverSideTranslations(initialLocale, ["footer", "notFound"]))
    }
  };
};

const Custom404: NextPageWithLayout = () => <Custom404Template />;

/* eslint-disable no-underscore-dangle */
Custom404.getLayout = (page, props): JSX.Element => {
  let title = "Instagram Clone";
  if (props._nextI18Next) {
    if (props._nextI18Next.initialLocale === "ja") {
      title = "ページが見つかりません • Instagram Clone";
    } else if (props._nextI18Next.initialLocale === "en") {
      title = "Page not found • Instagram Clone";
    }
  }

  return <Layout title={title}>{page}</Layout>;
};
/* eslint-enable no-underscore-dangle */

export default Custom404;
