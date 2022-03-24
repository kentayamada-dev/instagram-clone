import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { LandingPage } from "../components/templates/LandingPage";
import type { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import type { SSRConfig } from "next-i18next";

/*
 * Const { t } = useTranslation("common");
 *  <Text>{t("greeting")}</Text>;
 */

const Home: NextPage = () => <LandingPage />;

export const getStaticProps: GetStaticProps<SSRConfig> = async ({
  locale = "en"
}: GetStaticPropsContext) => {
  const translations = await serverSideTranslations(locale, ["common"]);

  return {
    props: {
      ...translations
    }
  };
};

export default Home;
