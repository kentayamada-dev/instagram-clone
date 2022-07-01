import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "../components/organisms/Layout";
import { AuthTemplate } from "../components/templates/AuthTemplate";
import { initializeApollo, addApolloState } from "../libs/apollo";
import { GetCurrentUserDocument } from "../types/generated/types";
import type { GetCurrentUserQuery } from "../types/generated/types";
import type { NextPageWithLayout } from "../types/pages";
import type {
  CurrentUserType,
  GetAuthServerSideProps,
  GetAuthServerSidePropsResultType
} from "../types/pages/auth/types";

export const getServerSideProps: GetAuthServerSideProps = async ({ req, locale, defaultLocale }) => {
  const initialLocale = locale ?? defaultLocale ?? "en";
  const apolloClient = initializeApollo();
  let currentUser: CurrentUserType = null;
  const { cookie } = req.headers;

  try {
    const { data } = await apolloClient.query<GetCurrentUserQuery>({
      context: {
        headers: {
          /* eslint-disable @typescript-eslint/naming-convention */
          "Content-Type": "application/json",
          "Cookie": cookie
          /* eslint-enable @typescript-eslint/naming-convention */
        }
      },
      query: GetCurrentUserDocument
    });
    currentUser = data.getCurrentUser;
    const pageProps: GetAuthServerSidePropsResultType = {
      props: {
        data: currentUser
      },
      redirect: {
        destination: "/",
        permanent: true
      }
    };

    return addApolloState(apolloClient, pageProps);
  } catch (error) {
    // Do nothing
  }

  const pageProps: GetAuthServerSidePropsResultType = {
    props: {
      data: null,
      // eslint-disable-next-line @typescript-eslint/no-extra-parens
      ...(await serverSideTranslations(initialLocale, ["form"]))
    }
  };

  return pageProps;
};

const Signup: NextPageWithLayout = () => <AuthTemplate isSignup />;

Signup.getLayout = (page): JSX.Element => <Layout title="Instagram Clone">{page}</Layout>;

export default Signup;
