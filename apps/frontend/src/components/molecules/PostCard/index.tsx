import { VStack, Box, useColorModeValue, Text, Skeleton } from "@chakra-ui/react";
import Image from "next/image";
import { constants } from "../../../constants";
import { UserCard } from "../userCard";
import type { PostCardType } from "./index.types";

const {
  COLORS: { WHITE, EBONY, BLACK_PEARL }
} = constants;

export const PostCard: PostCardType = ({ userId, src, userName, imageUrl, caption }) => {
  const bgColor = useColorModeValue(WHITE, EBONY);
  const borderColor = useColorModeValue("", BLACK_PEARL);

  return (
    <VStack
      align="flex-start"
      bgColor={bgColor}
      borderColor={borderColor}
      borderWidth={{
        base: "0px",
        md: "1px"
      }}
      spacing={0}
      w="100%"
    >
      <UserCard shouldUserNameHidden size={35} src={src} userId={userId} userName={userName} />
      <Box h="700px" pos="relative" w="100%">
        {imageUrl ? (
          <Image alt="Post Image" layout="fill" objectFit="cover" priority quality={100} src={imageUrl} />
        ) : (
          <Skeleton h="100%" w="100%" />
        )}
      </Box>
      {caption ? (
        <Text noOfLines={2} p="3">
          <Text as="span" fontWeight="bold">
            {userId}
          </Text>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          &nbsp;{caption}
        </Text>
      ) : null}
    </VStack>
  );
};
