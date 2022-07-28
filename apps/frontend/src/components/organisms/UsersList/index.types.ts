import type { GetAllUsersQuery } from "../../../generated";

export type UsersListProps = {
  usersEdge: GetAllUsersQuery["getAllUsers"]["edges"] | undefined;
};

export type UsersListType = (props: Partial<UsersListProps>) => JSX.Element;
