import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { LayoutTemplate } from "../../components/templates/LayoutTemplate";
import { UserDetailTemplate } from "../../components/templates/UserDetailTemplate";
import { GET_USER_QUERY } from "../../hooks/useUser/schema";
import { GET_ALL_USERS_ID_QUERY } from "../../hooks/useUsers/schema";
import { fetcher } from "../../libs/graphql_request";
import type { GetUserQuery, GetUserQueryVariables, GetAllUsersIdQuery } from "../../types/generated/types";
import type {
  GetUserStaticPathsType,
  GetUserStaticProps,
  NextUserPageWithLayoutType,
  UserPathsType
} from "../../types/pages/user";

export const getStaticPaths: GetUserStaticPathsType = async () => {
  const data = await fetcher<GetAllUsersIdQuery>(GET_ALL_USERS_ID_QUERY);

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
  const data = await fetcher<GetUserQuery, GetUserQueryVariables>(GET_USER_QUERY, { getUserId: params?.userId ?? "" });

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

/* eslint-disable no-underscore-dangle */
User.getLayout = (page, props): JSX.Element => {
  let title = "Instagram Clone";
  if (props.data && props._nextI18Next) {
    if (props._nextI18Next.initialLocale === "ja") {
      title = `${props.data.getUser.name} • Instagram写真と動画`;
    } else if (props._nextI18Next.initialLocale === "en") {
      title = `${props.data.getUser.name} • Instagram photos and videos`;
    }
  }

  return <LayoutTemplate title={title}>{page}</LayoutTemplate>;
};
/* eslint-enable no-underscore-dangle */

export default User;
