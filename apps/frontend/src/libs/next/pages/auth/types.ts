import type { UseCurrentUserReturnType } from "../../../../hooks/useCurrentUser/type";
import type { GetMyServerSidePropsResult, NextPageWithLayout } from "../../types";
import type { GetServerSideProps } from "next";

type AuthProps = {
  data: UseCurrentUserReturnType["currentUser"];
};

export type GetAuthServerSideProps = GetServerSideProps<AuthProps>;

export type GetAuthServerSidePropsResultType = GetMyServerSidePropsResult<AuthProps>;

export type NextAuthPageWithLayoutType = NextPageWithLayout<AuthProps>;
