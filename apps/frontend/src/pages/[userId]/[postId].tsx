import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { LayoutTemplate } from "../../components/templates/LayoutTemplate";
import { PostDetailTemplate } from "../../components/templates/PostDetailTemplate";
import { POST_QUERY } from "../../hooks/usePost/schema";
import { POSTS_ID_AND_USERS_ID_QUERY } from "../../hooks/usePosts/schema";
import { fetcher } from "../../libs/graphql_request";
import type { PostQuery, PostQueryVariables, PostsIdAndUsersIdQuery } from "../../generated";
import type {
  PostPathsType,
  GetPostStaticPathsType,
  GetPostStaticProps,
  NextPostPageWithLayoutType
} from "../../libs/next/pages/post";

export const getStaticPaths: GetPostStaticPathsType = async () => {
  const data = await fetcher<PostsIdAndUsersIdQuery>(POSTS_ID_AND_USERS_ID_QUERY);

  const enPaths = data.posts.nodes.map(
    (node): PostPathsType => ({
      locale: "en",
      params: {
        postId: node.id,
        userId: node.userId
      }
    })
  );

  const jaPaths = data.posts.nodes.map(
    (node): PostPathsType => ({
      locale: "ja",
      params: {
        postId: node.id,
        userId: node.userId
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
  let data: PostQuery | null = null;

  try {
    data = await fetcher<PostQuery, PostQueryVariables>(POST_QUERY, {
      first: 6,
      postId: params?.postId ?? "",
      postIdExcluded: params?.postId ?? ""
    });
  } catch (error) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      data: data.post,
      ...(await serverSideTranslations(initialLocale, ["footer", "common", "postDetail"]))
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

Post.getLayout = (page, props): JSX.Element => {
  let title = "Instagram Clone";
  const userName = props.data?.user.name;
  // eslint-disable-next-line no-underscore-dangle
  const initialLocale = props._nextI18Next?.initialLocale;

  if (userName && initialLocale) {
    if (initialLocale === "ja") {
      title = `${userName}はInstagramを利用しています`;
    } else if (initialLocale === "en") {
      title = `${userName} on Instagram`;
    }
  }

  return <LayoutTemplate title={title}>{page}</LayoutTemplate>;
};

export default Post;
