import {
  VStack,
  HStack,
  Box,
  useColorModeValue,
  Text,
  Skeleton
} from "@chakra-ui/react";
import Image from "next/image";
import { constants } from "../../../constants";
import { UserCard } from "../userCard";
import type { PostCardType } from "./index.types";

const {
  COLORS: { WHITE, EBONY, BLACK_PEARL }
} = constants;

export const PostCard: PostCardType = ({
  userId,
  src,
  userName,
  imageUrl,
  caption
}) => {
  const bgColor = useColorModeValue(WHITE, EBONY);
  const borderColor = useColorModeValue("", BLACK_PEARL);

  return (
    <VStack
      bgColor={bgColor}
      borderColor={borderColor}
      borderWidth={{
        base: "0px",
        md: "1px"
      }}
      spacing={0}
      w="100%"
    >
      <UserCard size={35} src={src} userId={userId} userName={userName} />
      <Box h="700px" pos="relative" w="100%">
        {imageUrl ? (
          <Image
            alt="Post Image"
            layout="fill"
            objectFit="cover"
            priority
            quality={100}
            src={imageUrl}
          />
        ) : (
          <Skeleton h="100%" w="100%" />
        )}
      </Box>
      {caption && (
        <HStack p="3" w="100%">
          <Text fontWeight="bold">{userName}</Text>
          <Text isTruncated>{caption}</Text>
        </HStack>
      )}
    </VStack>
  );
};
