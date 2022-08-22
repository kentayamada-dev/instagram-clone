import type { UsersQuery } from "../../../generated";
import type { NeverType } from "../../../types";
import type { UserCardFollowProps } from "../../molecules/userCard/index.types";
import type { BoxProps } from "@chakra-ui/react";

type UserCardProps = Pick<UserCardFollowProps, "buttonSize" | "getFollowState" | "handleFollow" | "isLink">;

type UsersBaseProps = Partial<Pick<BoxProps, "width">> & {
  userNodes: UsersQuery["users"]["nodes"] | undefined;
};

type UsersDefaultProps = NeverType<UserCardProps> & UsersBaseProps;

type UsersFollowListProps = UserCardProps & UsersBaseProps;

type UsersListProps = UsersDefaultProps | UsersFollowListProps;

export type UsersListType = (props: UsersListProps) => JSX.Element;
