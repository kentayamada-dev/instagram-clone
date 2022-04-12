import nookies from "nookies";
import { Layout } from "../components/organisms/Layout";
import { AuthTemplate } from "../components/templates/AuthTemplate";
import { constants } from "../constants";
import { initializeApollo, addApolloState } from "../libs/apollo";
import { GetCurrentUserDocument } from "../types/generated/types";
import type { GetCurrentUserQuery } from "../types/generated/types";
import type { NextPageWithLayout } from "../types/pages";
import type {
  CurrentUserType,
  GetAuthServerSideProps,
  GetAuthServerSidePropsResultType
} from "../types/pages/auth/types";

const { TOKEN_NAME } = constants;

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
    nookies.set(ctx, TOKEN_NAME, "", {
      maxAge: 0,
      path: "/"
    });
  }

  const pageProps: GetAuthServerSidePropsResultType = {
    props: {
      data: null
    }
  };

  return pageProps;
};

const Signup: NextPageWithLayout = () => <AuthTemplate isSignup />;

Signup.getLayout = (page): JSX.Element => (
  <Layout title="Instagram">{page}</Layout>
);

export default Signup;
