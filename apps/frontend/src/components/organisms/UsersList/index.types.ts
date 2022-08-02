import type { UsersQuery } from "../../../generated";

export type UsersListProps = {
  usersEdge: UsersQuery["users"]["edges"] | undefined;
};

export type UsersListType = (props: Partial<UsersListProps>) => JSX.Element;
