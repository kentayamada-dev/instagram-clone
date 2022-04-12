import { Layout } from "../../components/organisms/Layout";
import { PostDetailTemplate } from "../../components/templates/PostDetailTemplate";
import { initializeApollo } from "../../libs/apollo";
import {
  GetAllPostsIdAndUserIdDocument,
  GetPostDocument
} from "../../types/generated/types";
import type {
  GetPostQuery,
  GetPostQueryVariables,
  GetAllPostsIdAndUserIdQuery
} from "../../types/generated/types";
import type {
  PostPathsType,
  GetPostStaticPathsType,
  GetPostStaticProps,
  NextPostPageWithLayoutType
} from "../../types/pages/post";

export const getStaticPaths: GetPostStaticPathsType = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<GetAllPostsIdAndUserIdQuery>({
    query: GetAllPostsIdAndUserIdDocument
  });

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
    fallback: false,
    paths
  };
};

/* eslint-disable @typescript-eslint/indent */
export const getStaticProps: GetPostStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();
  const { data: post } = await apolloClient.query<
    GetPostQuery,
    GetPostQueryVariables
  >({
    query: GetPostDocument,
    variables: { getPostId: params?.postId ?? "" }
  });

  return {
    props: { data: post.getPost }
  };
};
/* eslint-enable @typescript-eslint/indent */

const Post: NextPostPageWithLayoutType = ({ data }) => (
  <PostDetailTemplate data={data} />
);

Post.getLayout = (page): JSX.Element => (
  <Layout title="Instagram">{page}</Layout>
);

export default Post;
