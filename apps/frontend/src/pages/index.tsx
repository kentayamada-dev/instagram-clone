import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Layout } from "../components/organisms/Layout";
import { AuthTemplate } from "../components/templates/AuthTemplate";
import { HomeTemplate } from "../components/templates/HomeTemplate";
import { GET_CURRENT_USER_QUERY } from "../hooks/useCurrentUser/schema";
import { fetcher } from "../libs/graphql_request";
import type { GetCurrentUserQuery } from "../types/generated/types";
import type {
  CurrentUserType,
  GetAuthServerSideProps,
  GetAuthServerSidePropsResultType,
  NextAuthPageWithLayoutType
} from "../types/pages/auth/types";

export const getServerSideProps: GetAuthServerSideProps = async ({
  locale,
  req: {
    headers: { cookie }
  },
  defaultLocale = "en"
}) => {
  const initialLocale = locale ?? defaultLocale;
  let currentUser: CurrentUserType = null;

  try {
    const data = await fetcher<GetCurrentUserQuery>(GET_CURRENT_USER_QUERY, null, { cookie: cookie ?? "" });
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

  return pageProps;
};

const Home: NextAuthPageWithLayoutType = ({ data }) => {
  if (data) {
    return <HomeTemplate />;
  }

  return <AuthTemplate isSignup={false} />;
};

Home.getLayout = (page): JSX.Element => <Layout>{page}</Layout>;

export default Home;
