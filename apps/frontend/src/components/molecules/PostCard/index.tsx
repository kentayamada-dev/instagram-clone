import { VStack, Box, useColorModeValue, Text, Skeleton } from "@chakra-ui/react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { constants } from "../../../constants";
import { getDateTime } from "../../../libs/date_fns";
import { UserCard } from "../userCard";
import type { PostCardType } from "./index.types";

const {
  COLORS: { WHITE, EBONY, GAINSBORO, SUVA_GREY, BLACK_PEARL }
} = constants;

export const PostCard: PostCardType = ({ userId, src, userName, imageUrl, caption, createdAt }) => {
  const bgColor = useColorModeValue(WHITE, EBONY);
  const borderColor = useColorModeValue(GAINSBORO, BLACK_PEARL);
  const router = useRouter();
  const { locale } = router;

  return (
    <VStack
      align="flex-start"
      as="article"
      bgColor={bgColor}
      border={`${borderColor} solid 1px`}
      borderRadius="lg"
      spacing={0}
      w="100%"
    >
      <Box p="10px">
        <UserCard shouldUserNameHidden src={src} userId={userId} userName={userName} />
      </Box>
      <Box h="600px" pos="relative" w="100%">
        {imageUrl ? (
          <NextImage alt="Post Image" layout="fill" objectFit="cover" priority quality={100} src={imageUrl} />
        ) : (
          <Skeleton h="100%" w="100%" />
        )}
      </Box>
      <Box p="3" w="100%">
        {userId ? (
          <Text fontSize="md" noOfLines={3}>
            <Text as="span" fontWeight="bold">
              {userId}
              &nbsp;
            </Text>
            {caption ? caption : ""}
          </Text>
        ) : (
          <Skeleton h="6" w="50%" />
        )}
        <Box mt="5">
          {createdAt ? (
            <Text as="time" color={SUVA_GREY} fontSize="sm">
              {getDateTime(createdAt, locale)}
            </Text>
          ) : (
            <Skeleton h="5" w="24" />
          )}
        </Box>
      </Box>
    </VStack>
  );
};
