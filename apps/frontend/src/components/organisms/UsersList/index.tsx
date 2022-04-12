import { VStack, HStack, Text, Box, Center, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { StyledAvatar } from "../../atoms/StyledAvatar";
import type { UsersListType } from "./index.types";

export const UsersList: UsersListType = ({ usersEdge, currentUser }) => (
  <VStack spacing={0} w="250px">
    {currentUser && (
      <HStack p="3" w="100%">
        <Center w="35%">
          <StyledAvatar
            alt="Avatar Image"
            size={40}
            src={currentUser.imageUrl}
          />
        </Center>
        <Box w="65%">
          <NextLink href={`/${currentUser.id}`} passHref>
            <Link>
              <Text fontWeight="bold" isTruncated>
                {currentUser.name}
              </Text>
            </Link>
          </NextLink>
        </Box>
      </HStack>
    )}
    {usersEdge?.map((userEdge) => {
      const user = userEdge.node;

      return (
        <HStack key={user.id} p="3" spacing={0} w="100%">
          <Center w="35%">
            <StyledAvatar alt="Avatar Image" size={30} src={user.imageUrl} />
          </Center>
          <Box w="65%">
            <NextLink href={`/${user.id}`} passHref>
              <Link>
                <Text fontWeight="bold" isTruncated>
                  {user.name}
                </Text>
              </Link>
            </NextLink>
          </Box>
        </HStack>
      );
    })}
  </VStack>
);
