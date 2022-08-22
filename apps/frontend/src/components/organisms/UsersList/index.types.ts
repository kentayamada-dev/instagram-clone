import type { UsersQuery } from "../../../generated";
import type { NeverType } from "../../../types";
import type { UserCardFollowPropsType } from "../../molecules/userCard/index.types";
import type { BoxProps } from "@chakra-ui/react";

type UserCardPropsType = Pick<UserCardFollowPropsType, "buttonSize" | "getFollowState" | "handleFollow" | "isLink">;

type UsersBasePropsType = Partial<Pick<BoxProps, "width">> & {
  usersEdge: UsersQuery["users"]["edges"] | undefined;
};

type UsersDefaultPropsType = NeverType<UserCardPropsType> & UsersBasePropsType;

type UsersFollowListPropsType = UserCardPropsType & UsersBasePropsType;

type UsersListPropsType = UsersDefaultPropsType | UsersFollowListPropsType;

export type UsersListType = (props: UsersListPropsType) => JSX.Element;
