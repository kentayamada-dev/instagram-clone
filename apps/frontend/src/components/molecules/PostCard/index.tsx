import { VStack, Box, useColorModeValue, Text, Skeleton } from "@chakra-ui/react";
import { formatDistanceToNowStrict, format } from "date-fns";
import { ja, enUS } from "date-fns/locale";
import Image from "next/image";
import { useRouter } from "next/router";
import { constants } from "../../../constants";
import { UserCard } from "../userCard";
import type { PostCardType } from "./index.types";

const {
  COLORS: { WHITE, EBONY, GAINSBORO, SUVA_GREY, BLACK_PEARL }
} = constants;

const ONE_WEEK_IN_SEC = 604800;

export const PostCard: PostCardType = ({ userId, src, userName, imageUrl, caption, createdAt }) => {
  const bgColor = useColorModeValue(WHITE, EBONY);
  const borderColor = useColorModeValue(GAINSBORO, BLACK_PEARL);
  const router = useRouter();
  const { locale } = router;
  const getDateTime = (date: string): string => {
    const createdAtDate = new Date(date);
    const fnsLocale = locale === "ja" ? ja : enUS;
    const dateInSec = Number(formatDistanceToNowStrict(createdAtDate, { unit: "second" }).replace(/\D/gu, ""));
    if (dateInSec > ONE_WEEK_IN_SEC) {
      return format(createdAtDate, locale === "ja" ? "yyyy年MM月dd日" : "MMMM d, yyyy", {
        locale: fnsLocale
      });
    }

    return formatDistanceToNowStrict(createdAtDate, {
      addSuffix: true,
      locale: fnsLocale
    });
  };

  return (
    <VStack
      align="flex-start"
      bgColor={bgColor}
      border={`${borderColor} solid 1px`}
      borderRadius="lg"
      spacing={0}
      w="100%"
    >
      <UserCard shouldUserNameHidden size={35} src={src} userId={userId} userName={userName} />
      <Box h="600px" pos="relative" w="100%">
        {imageUrl ? (
          <Image alt="Post Image" layout="fill" objectFit="cover" priority quality={100} src={imageUrl} />
        ) : (
          <Skeleton h="100%" w="100%" />
        )}
      </Box>
      <Box p="3" w="100%">
        {userId ? (
          <Text fontSize="md" noOfLines={2}>
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
            <Text color={SUVA_GREY} fontSize="sm">
              {getDateTime(createdAt)}
            </Text>
          ) : (
            <Skeleton h="5" w="24" />
          )}
        </Box>
      </Box>
    </VStack>
  );
};
