import type { UseCurrentUserReturnType } from "../../../../hooks/useCurrentUser/type";
import type { NextPageWithLayout } from "../../types";
import type { GetServerSideProps, GetServerSidePropsResult } from "next";

type AuthProps = {
  data: UseCurrentUserReturnType["currentUser"];
};

export type GetAuthServerSideProps = GetServerSideProps<AuthProps>;

export type GetAuthServerSidePropsResultType = GetServerSidePropsResult<AuthProps>;

export type NextAuthPageWithLayoutType = NextPageWithLayout<AuthProps>;
