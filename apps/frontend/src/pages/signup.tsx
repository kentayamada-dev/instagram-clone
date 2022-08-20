import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { LoadingAnimation } from "../components/atoms/LoadingAnimation";
import { AuthTemplate } from "../components/templates/AuthTemplate";
import { LayoutTemplate } from "../components/templates/LayoutTemplate";
import { useCurrentUser } from "../hooks/useCurrentUser";
import type { NextPageWithLayout } from "../libs/next/types";
import type { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale = "en" }) => {
  const initialLocale = locale ?? defaultLocale;

  return {
    props: {
      ...(await serverSideTranslations(initialLocale, ["common", "form", "footer"]))
    }
  };
};

const Signup: NextPageWithLayout = () => {
  const { currentUser, isCurrentUserLoading } = useCurrentUser();
  const router = useRouter();

  if (isCurrentUserLoading) {
    return <LoadingAnimation />;
  }

  if (currentUser) {
    void router.replace("/");

    return null;
  }

  return <AuthTemplate isSignup />;
};

Signup.getLayout = (page, props): JSX.Element => {
  let title = "Instagram Clone";
  // eslint-disable-next-line no-underscore-dangle
  const initialLocale = props._nextI18Next?.initialLocale;

  if (initialLocale) {
    if (initialLocale === "ja") {
      title = "登録 • Instagram";
    } else if (initialLocale === "en") {
      title = "Sign up • Instagram";
    }
  }

  return <LayoutTemplate title={title}>{page}</LayoutTemplate>;
};

export default Signup;
