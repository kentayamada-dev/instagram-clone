import { Progress } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { Layout } from "../../components/organisms/Layout";
import { PostDetailTemplate } from "../../components/templates/PostDetailTemplate";
import { initializeApollo } from "../../libs/apollo";
import { GetAllPostsIdAndUserIdDocument, GetPostDocument } from "../../types/generated/types";
import type { GetPostQuery, GetPostQueryVariables, GetAllPostsIdAndUserIdQuery } from "../../types/generated/types";
import type {
  PostPathsType,
  GetPostStaticPathsType,
  GetPostStaticProps,
  NextPostPageWithLayoutType
} from "../../types/pages/post";

export const getStaticPaths: GetPostStaticPathsType = async () => {
  const apolloClient = initializeApollo();
  const { data, error } = await apolloClient.query<GetAllPostsIdAndUserIdQuery>({
    query: GetAllPostsIdAndUserIdDocument
  });

  if (error) {
    throw new Error(`Failed to fetch post, ${error.message}`);
  }

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
  const apolloClient = initializeApollo();
  const { data: postData, errors } = await apolloClient.query<GetPostQuery, GetPostQueryVariables>({
    errorPolicy: "all",
    query: GetPostDocument,
    variables: { getPostId: params?.postId ?? "" }
  });

  if (errors) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      data: postData.getPost,
      ...(await serverSideTranslations(initialLocale, ["footer"]))
    },
    revalidate: 1
  };
};

const Post: NextPostPageWithLayoutType = ({ data }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Progress isIndeterminate size="xs" />;
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

  return <Layout title={title}>{page}</Layout>;
};
/* eslint-enable no-underscore-dangle */

export default Post;
