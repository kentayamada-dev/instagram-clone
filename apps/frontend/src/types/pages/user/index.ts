import type { MyPathsType, NextPageWithLayout } from "..";
import type { UserDetailTemplateProps } from "../../../components/templates/UserDetailTemplate/index.types";
import type { GetStaticPaths, GetStaticProps } from "next";

export type UserUrlQueryType = {
  userId: string;
};

export type UserPathsType = MyPathsType<UserUrlQueryType>;

export type GetUserStaticPathsType = GetStaticPaths<UserUrlQueryType>;

export type GetUserStaticProps = GetStaticProps<UserDetailTemplateProps, UserUrlQueryType>;

export type NextUserPageWithLayoutType = NextPageWithLayout<UserDetailTemplateProps>;
