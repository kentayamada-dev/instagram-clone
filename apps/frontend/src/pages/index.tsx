import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { LoadingAnimation } from "../components/atoms/LoadingAnimation";
import { AuthTemplate } from "../components/templates/AuthTemplate";
import { HomeTemplate } from "../components/templates/HomeTemplate";
import { LayoutTemplate } from "../components/templates/LayoutTemplate";
import { useCurrentUser } from "../hooks/useCurrentUser";
import type { NextPageWithLayout } from "../lib/next/types";
import type { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale = "en" }) => {
  const initialLocale = locale ?? defaultLocale;

  return {
    props: {
      ...(await serverSideTranslations(initialLocale, ["common", "form", "footer"]))
    }
  };
};

const Home: NextPageWithLayout = () => {
  const { currentUser, isCurrentUserLoading } = useCurrentUser();

  if (isCurrentUserLoading) {
    return <LoadingAnimation />;
  }

  if (currentUser) {
    return <HomeTemplate currentUser={currentUser} />;
  }

  return <AuthTemplate isSignup={false} />;
};

Home.getLayout = (page): JSX.Element => <LayoutTemplate>{page}</LayoutTemplate>;

export default Home;
