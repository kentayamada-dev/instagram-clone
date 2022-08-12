import { Box } from "@chakra-ui/react";
import { UserCard } from "../../molecules/userCard";
import type { UsersListType } from "./index.types";

export const UsersList: UsersListType = ({ usersEdge }) => {
  if (usersEdge) {
    return (
      <>
        {usersEdge.map((userEdge) => {
          const user = userEdge.node;

          return (
            <Box key={user.id} w="100%">
              <UserCard size={35} src={user.imageUrl} userId={user.id} userName={user.name} />
            </Box>
          );
        })}
      </>
    );
  }

  return (
    <>
      {[...Array(5)].map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Box key={index} w="100%">
          <UserCard size={35} />
        </Box>
      ))}
    </>
  );
};
