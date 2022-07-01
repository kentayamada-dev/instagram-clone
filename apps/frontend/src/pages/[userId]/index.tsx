import { useRouter } from "next/router";
import { Layout } from "../../components/organisms/Layout";
import { UserDetailTemplate } from "../../components/templates/UserDetailTemplate";
import { initializeApollo } from "../../libs/apollo";
import { GetAllUsersIdDocument, GetUserDocument } from "../../types/generated/types";
import type { GetUserQuery, GetUserQueryVariables, GetAllUsersIdQuery } from "../../types/generated/types";
import type {
  GetUserStaticPathsType,
  GetUserStaticProps,
  NextUserPageWithLayoutType,
  UserPathsType
} from "../../types/pages/user";

export const getStaticPaths: GetUserStaticPathsType = async () => {
  const apolloClient = initializeApollo();
  const { data, error } = await apolloClient.query<GetAllUsersIdQuery>({
    query: GetAllUsersIdDocument
  });

  if (error) {
    throw new Error(`Failed to fetch user, ${error.message}`);
  }

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
    fallback: true,
    paths
  };
};

/* eslint-disable @typescript-eslint/indent */
export const getStaticProps: GetUserStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();
  const { data: userData, error } = await apolloClient.query<GetUserQuery, GetUserQueryVariables>({
    query: GetUserDocument,
    variables: { getUserId: params?.userId ?? "" }
  });

  if (error) {
    throw new Error(`Failed to fetch users, ${error.message}`);
  }

  return {
    props: {
      data: userData.getUser
    },
    revalidate: 1
  };
};
/* eslint-enable @typescript-eslint/indent */

const User: NextUserPageWithLayoutType = ({ data }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <UserDetailTemplate data={data} />;
};

User.getLayout = (page): JSX.Element => <Layout title="Instagram Clone">{page}</Layout>;

export default User;
