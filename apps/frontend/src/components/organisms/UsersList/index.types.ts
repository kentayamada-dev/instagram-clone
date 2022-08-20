import type { UsersQuery } from "../../../generated";
import type { NeverType } from "../../../types";
import type { UserCardFollowPropsType } from "../../molecules/userCard/index.types";

type UserCardPropsType = Pick<UserCardFollowPropsType, "getFollowState" | "handleFollow" | "isLink">;

type UsersBasePropsType = {
  usersEdge: UsersQuery["users"]["edges"] | undefined;
};

type UsersDefaultPropsType = NeverType<UserCardPropsType> & UsersBasePropsType;

type UsersFollowListPropsType = UserCardPropsType & UsersBasePropsType;

type UsersListPropsType = UsersDefaultPropsType | UsersFollowListPropsType;

export type UsersListType = (props: UsersListPropsType) => JSX.Element;
