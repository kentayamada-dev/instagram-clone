import type { GetCurrentUserQuery } from "../../../../generated";
import type { NextPageWithLayout } from "../../types";
import type { GetServerSideProps, GetServerSidePropsResult } from "next";

type GetCurrentUserType = GetCurrentUserQuery["getCurrentUser"];

type AuthProps = {
  data: GetCurrentUserType | null;
};

export type GetAuthServerSideProps = GetServerSideProps<AuthProps>;

export type GetAuthServerSidePropsResultType = GetServerSidePropsResult<AuthProps>;

export type NextAuthPageWithLayoutType = NextPageWithLayout<AuthProps>;
