import type { UsersQuery } from "../../../generated";
import type { NeverType } from "../../../types";
import type { UserCardFollowProps } from "../../molecules/userCard/index.types";

type UserCardPropsType = Pick<UserCardFollowProps, "getFollowState" | "handleFollow" | "isLink">;

type UsersBaseProps = {
  usersEdge: UsersQuery["users"]["edges"] | undefined;
};

type UsersDefaultProps = NeverType<UserCardPropsType> & UsersBaseProps;

type UsersFollowListProps = UserCardPropsType & UsersBaseProps;

type UsersListProps = UsersDefaultProps | UsersFollowListProps;

export type UsersListType = (props: UsersListProps) => JSX.Element;
