import type { GetAllUsersQuery } from "../../../types/generated/types";

export type UsersListProps = {
  usersEdge: GetAllUsersQuery["getAllUsers"]["edges"] | undefined;
};

export type UsersListType = (props: Partial<UsersListProps>) => JSX.Element;
