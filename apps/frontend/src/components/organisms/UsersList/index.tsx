import { Box } from "@chakra-ui/react";
import { UserCard } from "../../molecules/userCard";
import type { UsersListType } from "./index.types";

export const UsersList: UsersListType = ({ usersEdge, width = "100%", ...rest }) => {
  if (usersEdge) {
    return (
      <>
        {usersEdge.map((userEdge) => {
          const user = userEdge.node;

          return (
            <Box key={user.id} p="12px" w={width}>
              <UserCard {...rest} src={user.imageUrl} userId={user.id} userName={user.name} />
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
        <Box key={index} p="12px" w={width}>
          <UserCard />
        </Box>
      ))}
    </>
  );
};
