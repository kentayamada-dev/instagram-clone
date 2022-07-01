import type { MyPathsType, NextPageWithLayout } from "..";
import type { PostDetailTemplateProps } from "../../../components/templates/PostDetailTemplate/index.types";
import type { UserUrlQueryType } from "../user";
import type { GetStaticPaths, GetStaticProps } from "next";

type PostUrlQueryType = UserUrlQueryType & {
  postId: string;
};

export type PostPathsType = MyPathsType<PostUrlQueryType>;

export type GetPostStaticPathsType = GetStaticPaths<PostUrlQueryType>;

/* eslint-disable @typescript-eslint/indent */
export type GetPostStaticProps = GetStaticProps<PostDetailTemplateProps, PostUrlQueryType>;
/* eslint-enable @typescript-eslint/indent */

export type NextPostPageWithLayoutType = NextPageWithLayout<PostDetailTemplateProps>;
