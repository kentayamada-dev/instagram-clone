import { Layout } from "../../components/organisms/Layout";
import { UserDetailTemplate } from "../../components/templates/UserDetailTemplate";
import { initializeApollo } from "../../libs/apollo";
import {
  GetAllUsersIdDocument,
  GetUserDocument
} from "../../types/generated/types";
import type {
  GetUserQuery,
  GetUserQueryVariables,
  GetAllUsersIdQuery
} from "../../types/generated/types";
import type {
  GetUserStaticPathsType,
  GetUserStaticProps,
  NextUserPageWithLayoutType,
  UserPathsType
} from "../../types/pages/user";

export const getStaticPaths: GetUserStaticPathsType = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<GetAllUsersIdQuery>({
    query: GetAllUsersIdDocument
  });

  const enPaths = data.getAllUsersId.map(
    (node): UserPathsType => ({
      locale: "en",
      params: {
        userId: node.id
      }
    })
  );

  const jaPaths = data.getAllUsersId.map(
    (node): UserPathsType => ({
      locale: "ja",
      params: {
        userId: node.id
      }
    })
  );

  const paths = enPaths.concat(jaPaths);

  return {
    fallback: false,
    paths
  };
};

/* eslint-disable @typescript-eslint/indent */
export const getStaticProps: GetUserStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();
  const { data: user } = await apolloClient.query<
    GetUserQuery,
    GetUserQueryVariables
  >({
    query: GetUserDocument,
    variables: { getUserId: params?.userId ?? "" }
  });

  return {
    props: { data: user.getUser }
  };
};

/* eslint-enable @typescript-eslint/indent */

const User: NextUserPageWithLayoutType = ({ data }) => (
  <UserDetailTemplate data={data} />
);

User.getLayout = (page): JSX.Element => (
  <Layout title="Instagram">{page}</Layout>
);

export default User;
