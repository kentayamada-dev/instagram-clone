import { getServerSideSitemap } from "next-sitemap";
import { constants } from "../../constants";
import { POSTS_ID_AND_USERS_ID_AND_UPDATED_AT_QUERY } from "../../hooks/usePosts/schema";
import { fetcher } from "../../libs/graphql_request";
import type { PostsIdAndUsersIdUpdatedAtQuery } from "../../generated";
import type { GetServerSideProps } from "next";
import type { ISitemapField } from "next-sitemap";

const { SITE_URL } = constants;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await fetcher<PostsIdAndUsersIdUpdatedAtQuery>(POSTS_ID_AND_USERS_ID_AND_UPDATED_AT_QUERY);

  const enFields: ISitemapField[] = data.posts.nodes.map((node) => ({
    lastmod: node.updatedAt,
    loc: `${SITE_URL}/${node.userId}/${node.id}/`
  }));

  const jaFields: ISitemapField[] = data.posts.nodes.map((node) => ({
    lastmod: node.updatedAt,
    loc: `${SITE_URL}/ja/${node.userId}/${node.id}/`
  }));

  return getServerSideSitemap(ctx, [...enFields, ...jaFields]);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-empty-function
export default function Sitemap() {}
