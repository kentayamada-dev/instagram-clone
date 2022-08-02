import type { UsersQuery } from "../../../generated";

type UsersListProps = {
  usersEdge: UsersQuery["users"]["edges"] | undefined;
};

export type UsersListType = (props: Partial<UsersListProps>) => JSX.Element;
