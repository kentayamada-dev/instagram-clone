import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { LayoutTemplate } from "../../components/templates/LayoutTemplate";
import { UserDetailTemplate } from "../../components/templates/UserDetailTemplate";
import { USER_QUERY } from "../../hooks/useUser/schema";
import { USERS_ID_QUERY } from "../../hooks/useUsers/schema";
import { fetcher } from "../../libs/graphql_request";
import type { UserQuery, UserQueryVariables, UsersIdQuery } from "../../generated";
import type {
  GetUserStaticPathsType,
  GetUserStaticProps,
  NextUserPageWithLayoutType,
  UserPathsType
} from "../../libs/next/pages/user";

export const getStaticPaths: GetUserStaticPathsType = async () => {
  const data = await fetcher<UsersIdQuery>(USERS_ID_QUERY);

  const enPaths = data.users.nodes.map(
    (node): UserPathsType => ({
      locale: "en",
      params: {
        userId: node.id
      }
    })
  );

  const jaPaths = data.users.nodes.map(
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
  let data: UserQuery | null = null;

  try {
    data = await fetcher<UserQuery, UserQueryVariables>(USER_QUERY, {
      userId: params?.userId ?? ""
    });
  } catch (error) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      data,
      ...(await serverSideTranslations(initialLocale, ["footer", "common"]))
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

User.getLayout = (page, props): JSX.Element => {
  let title = "Instagram Clone";
  // eslint-disable-next-line no-underscore-dangle
  const initialLocale = props._nextI18Next?.initialLocale;
  const userName = props.data?.user.name;
  const userId = props.data?.user.id;

  if (userName && initialLocale && userId) {
    if (initialLocale === "ja") {
      title = `${userName}(@${userId}) • Instagram Clone写真と動画`;
    } else if (initialLocale === "en") {
      title = `${userName} (@${userId}) • Instagram Clone photos and videos`;
    }
  }

  return <LayoutTemplate title={title}>{page}</LayoutTemplate>;
};

export default User;
