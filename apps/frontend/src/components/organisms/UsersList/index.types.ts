import type {
  GetAllUsersQuery,
  GetCurrentUserQuery
} from "../../../types/generated/types";

export type UsersListProps = {
  usersEdge: GetAllUsersQuery["getAllUsers"]["edges"] | undefined;
  currentUser: GetCurrentUserQuery["getCurrentUser"] | undefined;
};

export type UsersListType = (props: UsersListProps) => JSX.Element;
