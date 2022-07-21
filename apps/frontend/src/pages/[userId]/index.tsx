import { serverSideTranslations } from "next-i18next/serverSideTranslations";
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

export const getStaticProps: GetUserStaticProps = async ({ params, locale, defaultLocale = "en" }) => {
  const initialLocale = locale ?? defaultLocale;
  const apolloClient = initializeApollo();
  const { data: userData, errors } = await apolloClient.query<GetUserQuery, GetUserQueryVariables>({
    errorPolicy: "all",
    query: GetUserDocument,
    variables: { getUserId: params?.userId ?? "" }
  });

  if (errors) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      data: userData.getUser,
      ...(await serverSideTranslations(initialLocale, ["footer"]))
    },
    revalidate: 1
  };
};

const User: NextUserPageWithLayoutType = ({ data }) => {
  const router = useRouter();

  if (router.isFallback) {
    return null;
  }

  return <UserDetailTemplate data={data} />;
};

/* eslint-disable no-underscore-dangle */
User.getLayout = (page, props): JSX.Element => {
  let title = "Instagram Clone";
  if (props.data && props._nextI18Next) {
    if (props._nextI18Next.initialLocale === "ja") {
      title = `${props.data.name} • Instagram写真と動画`;
    } else if (props._nextI18Next.initialLocale === "en") {
      title = `${props.data.name} • Instagram photos and videos`;
    }
  }

  return <Layout title={title}>{page}</Layout>;
};
/* eslint-enable no-underscore-dangle */

export default User;
