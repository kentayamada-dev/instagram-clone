import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AuthTemplate } from "../components/templates/AuthTemplate";
import { LayoutTemplate } from "../components/templates/LayoutTemplate";
import { CURRENT_USER_QUERY } from "../hooks/useCurrentUser/schema";
import { fetcher } from "../libs/graphql_request";
import type { CurrentUserQuery } from "../generated";
import type { GetAuthServerSideProps, GetAuthServerSidePropsResultType } from "../libs/next/pages/auth/types";
import type { NextPageWithLayout } from "../libs/next/types";

export const getServerSideProps: GetAuthServerSideProps = async ({
  req: {
    headers: { cookie }
  },
  locale,
  defaultLocale = "en"
}) => {
  const initialLocale = locale ?? defaultLocale;

  try {
    await fetcher<CurrentUserQuery>(CURRENT_USER_QUERY, null, { cookie: cookie ?? "" });
    const pageProps: GetAuthServerSidePropsResultType = {
      redirect: {
        destination: "/",
        permanent: true
      }
    };

    return pageProps;
  } catch (error) {
    // Do nothing
  }

  const pageProps: GetAuthServerSidePropsResultType = {
    props: {
      data: null,
      ...(await serverSideTranslations(initialLocale, ["common", "form", "footer"]))
    }
  };

  return pageProps;
};

const Signup: NextPageWithLayout = () => <AuthTemplate isSignup />;

/* eslint-disable no-underscore-dangle */
Signup.getLayout = (page, props): JSX.Element => {
  let title = "Instagram Clone";
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
/* eslint-enable no-underscore-dangle */

export default Signup;
