import {
  VStack,
  HStack,
  Box,
  Text,
  useColorModeValue,
  Link
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { constants } from "../../../constants";
import { StyledAvatar } from "../../atoms/StyledAvatar";
import type { PostsListType } from "./index.types";

const {
  COLORS: { WHITE, EBONY, BLACK_PEARL }
} = constants;

export const PostsList: PostsListType = ({ postsEdge }) => {
  const bgColor = useColorModeValue(WHITE, EBONY);
  const borderColor = useColorModeValue("", BLACK_PEARL);

  return (
    <VStack spacing={10}>
      {postsEdge.map((postEdge) => {
        const post = postEdge.node;

        return (
          <VStack
            bgColor={bgColor}
            borderColor={borderColor}
            borderWidth={{
              base: "0px",
              md: "1px"
            }}
            key={post.id}
            spacing={0}
            w="100%"
          >
            <HStack p="3" w="100%">
              <StyledAvatar
                alt="Avatar Image"
                size={35}
                src={post.user.imageUrl}
              />
              <NextLink href={`/${post.user.id}`} passHref>
                <Link>
                  <Text fontWeight="bold">{post.user.name}</Text>
                </Link>
              </NextLink>
            </HStack>
            <Box h="700px" pos="relative" w="100%">
              <Image
                alt="Post Image"
                layout="fill"
                objectFit="cover"
                priority
                quality={100}
                src={post.imageUrl}
              />
            </Box>
            {post.caption !== null && (
              <HStack p="3" w="100%">
                <Text fontWeight="bold">{post.user.name}</Text>
                <Text isTruncated>{post.caption}</Text>
              </HStack>
            )}
          </VStack>
        );
      })}
    </VStack>
  );
};
