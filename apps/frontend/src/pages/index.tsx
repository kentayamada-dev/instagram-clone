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

export const getServerSideProps: GetAuthServerSideProps = async (ctx) => {
  const apolloClient = initializeApollo();
  let currentUser: CurrentUserType = null;
  const { cookie } = ctx.req.headers;

  try {
    const { data } = await apolloClient.query<GetCurrentUserQuery>({
      context: { headers: { cookie } },
      query: GetCurrentUserDocument
    });
    currentUser = data.getCurrentUser;
  } catch (error) {
    // Do nothing
  }

  // eslint-disable-next-line no-console
  console.log("currentUser", currentUser);

  const pageProps: GetAuthServerSidePropsResultType = {
    props: {
      data: currentUser
    }
  };

  return addApolloState(apolloClient, pageProps);
};

const Home: NextAuthPageWithLayoutType = ({ data }) => {
  // eslint-disable-next-line no-console
  console.log("data", data);

  if (data === null) {
    return <AuthTemplate isSignup={false} />;
  }

  return <HomeTemplate />;
};

Home.getLayout = (page): JSX.Element => (
  <Layout title="Instagram">{page}</Layout>
);

export default Home;
