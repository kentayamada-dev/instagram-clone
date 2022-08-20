import type { UserDetailTemplatePropsType } from "../../../../components/templates/UserDetailTemplate/index.types";
import type { MyPathsType, NextPageWithLayout } from "../../types";
import type { GetStaticPaths, GetStaticProps } from "next";

export type UserUrlQueryType = {
  userId: string;
};

export type UserPathsType = MyPathsType<UserUrlQueryType>;

export type GetUserStaticPathsType = GetStaticPaths<UserUrlQueryType>;

export type GetUserStaticPropsType = GetStaticProps<UserDetailTemplatePropsType, UserUrlQueryType>;

export type NextUserPageWithLayoutType = NextPageWithLayout<UserDetailTemplatePropsType>;
