import type { PostDetailTemplatePropsType } from "../../../../components/templates/PostDetailTemplate/index.types";
import type { MyPathsType, NextPageWithLayout } from "../../types";
import type { UserUrlQueryType } from "../user";
import type { GetStaticPaths, GetStaticProps } from "next";

type PostUrlQueryType = UserUrlQueryType & {
  postId: string;
};

export type PostPathsType = MyPathsType<PostUrlQueryType>;

export type GetPostStaticPathsType = GetStaticPaths<PostUrlQueryType>;

export type GetPostStaticPropsType = GetStaticProps<PostDetailTemplatePropsType, PostUrlQueryType>;

export type NextPostPageWithLayoutType = NextPageWithLayout<PostDetailTemplatePropsType>;
