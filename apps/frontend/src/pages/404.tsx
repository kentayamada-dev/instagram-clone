import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Custom404Template } from "../components/templates/Custom404Template";
import { LayoutTemplate } from "../components/templates/LayoutTemplate";
import type { NextPageWithLayout } from "../libs/next/types";
import type { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale = "en" }) => {
  const initialLocale = locale ?? defaultLocale;

  return {
    props: {
      ...(await serverSideTranslations(initialLocale, ["footer", "notFound", "common"]))
    }
  };
};

const Custom404: NextPageWithLayout = () => <Custom404Template />;

Custom404.getLayout = (page, props): JSX.Element => {
  let title = "Instagram Clone";
  // eslint-disable-next-line no-underscore-dangle
  const initialLocale = props._nextI18Next?.initialLocale;

  if (initialLocale) {
    if (initialLocale === "ja") {
      title = "ページが見つかりません • Instagram Clone";
    } else if (initialLocale === "en") {
      title = "Page not found • Instagram Clone";
    }
  }

  return <LayoutTemplate title={title}>{page}</LayoutTemplate>;
};

export default Custom404;
