import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "../components/organisms/Layout";
import { AuthTemplate } from "../components/templates/AuthTemplate";
import { HomeTemplate } from "../components/templates/HomeTemplate";
import { addApolloState, initializeApollo } from "../libs/apollo";
import { GetCurrentUserDocument } from "../types/generated/types";
import type { GetCurrentUserQuery } from "../types/generated/types";
import type {
  CurrentUserType,
  GetAuthServerSideProps,
  GetAuthServerSidePropsResultType,
  NextAuthPageWithLayoutType
} from "../types/pages/auth/types";

export const getServerSideProps: GetAuthServerSideProps = async ({ locale, req, defaultLocale = "en" }) => {
  const initialLocale = locale ?? defaultLocale;
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
  } catch (error) {
    // Do nothing
  }

  const pageProps: GetAuthServerSidePropsResultType = {
    props: {
      data: currentUser,
      ...(await serverSideTranslations(initialLocale, ["common", "form", "footer"]))
    }
  };

  return addApolloState(apolloClient, pageProps);
};

const Home: NextAuthPageWithLayoutType = ({ data }) => {
  if (data === null) {
    return <AuthTemplate isSignup={false} />;
  }

  return <HomeTemplate />;
};

Home.getLayout = (page): JSX.Element => <Layout>{page}</Layout>;

export default Home;
