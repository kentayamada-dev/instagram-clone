import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { LayoutTemplate } from "../../components/templates/LayoutTemplate";
import { PostDetailTemplate } from "../../components/templates/PostDetailTemplate";
import { GET_POST_QUERY } from "../../hooks/usePost/schema";
import { GET_ALL_POSTS_ID_AND_USER_ID_QUERY } from "../../hooks/usePosts/schema";
import { fetcher } from "../../libs/graphql_request";
import type { GetPostQuery, GetPostQueryVariables, GetAllPostsIdAndUserIdQuery } from "../../types/generated/types";
import type {
  PostPathsType,
  GetPostStaticPathsType,
  GetPostStaticProps,
  NextPostPageWithLayoutType
} from "../../types/pages/post";

export const getStaticPaths: GetPostStaticPathsType = async () => {
  const data = await fetcher<GetAllPostsIdAndUserIdQuery>(GET_ALL_POSTS_ID_AND_USER_ID_QUERY);

  const enPaths = data.getAllPostsIdAndUserId.map(
    (node): PostPathsType => ({
      locale: "en",
      params: {
        postId: node.id,
        userId: node.user.id
      }
    })
  );

  const jaPaths = data.getAllPostsIdAndUserId.map(
    (node): PostPathsType => ({
      locale: "ja",
      params: {
        postId: node.id,
        userId: node.user.id
      }
    })
  );

  const paths = enPaths.concat(jaPaths);

  return {
    fallback: true,
    paths
  };
};

export const getStaticProps: GetPostStaticProps = async ({ params, locale, defaultLocale = "en" }) => {
  const initialLocale = locale ?? defaultLocale;
  let data: GetPostQuery | null = null;

  try {
    data = await fetcher<GetPostQuery, GetPostQueryVariables>(GET_POST_QUERY, { getPostId: params?.postId ?? "" });
  } catch (error) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      data: data.getPost,
      ...(await serverSideTranslations(initialLocale, ["footer", "common"]))
    },
    revalidate: 1
  };
};

const Post: NextPostPageWithLayoutType = ({ data }) => {
  const router = useRouter();

  if (router.isFallback) {
    return null;
  }

  return <PostDetailTemplate data={data} />;
};

/* eslint-disable no-underscore-dangle */
Post.getLayout = (page, props): JSX.Element => {
  let title = "Instagram Clone";
  if (props.data && props._nextI18Next) {
    if (props._nextI18Next.initialLocale === "ja") {
      title = `${props.data.user.name}のInstagram写真`;
    } else if (props._nextI18Next.initialLocale === "en") {
      title = `Instagram photo by ${props.data.user.name}`;
    }
  }

  return <LayoutTemplate title={title}>{page}</LayoutTemplate>;
};
/* eslint-enable no-underscore-dangle */

export default Post;
