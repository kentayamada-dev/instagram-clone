import { Box, Center, SimpleGrid, useColorModeValue, Text, VStack, Show, Hide, Flex } from "@chakra-ui/react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { constants } from "../../../constants";
import { getDateTime } from "../../../libs/date_fns";
import { CommentCard } from "../../molecules/CommentCard";
import { UserCard } from "../../molecules/userCard";
import type { PostDetailTemplateType } from "./index.types";

const {
  COLORS: { GAINSBORO, BLACK_PEARL, WHITE, EBONY, SUVA_GREY }
} = constants;

export const PostDetailTemplate: PostDetailTemplateType = ({ data }) => {
  const borderColor = useColorModeValue(GAINSBORO, BLACK_PEARL);
  const bgColor = useColorModeValue(WHITE, EBONY);
  const router = useRouter();
  const { locale } = router;

  return (
    <Box margin="0 auto" pb="30px" pt={{ base: 0, md: "30px" }} w={{ base: "100%", md: "inherit" }}>
      <SimpleGrid
        bgColor={bgColor}
        border={`${borderColor} solid 1px`}
        columns={{ base: 1, md: 2 }}
        h={{ base: "100%", md: "530px" }}
        w={{ lg: "900px", md: "700px", sm: "100%" }}
      >
        <Show below="md">
          <UserCard
            shouldUserNameHidden
            size={35}
            src={data.user.imageUrl}
            userId={data.user.id}
            userName={data.user.name}
          />
        </Show>
        <Box minH="400px" pos="relative">
          <NextImage alt="Post Image" layout="fill" objectFit="cover" priority quality={100} src={data.imageUrl} />
        </Box>
        <Flex flexDir="column" justify="space-between" minH="200px">
          <Box>
            <Hide below="md">
              <UserCard
                shouldUserNameHidden
                size={35}
                src={data.user.imageUrl}
                userId={data.user.id}
                userName={data.user.name}
              />
            </Hide>
            {data.caption === null ? (
              <Center pt={{ base: "50px", md: "100px" }}>
                <VStack>
                  <Text>No comments yet.</Text>
                  <Text>Start the conversation.</Text>
                </VStack>
              </Center>
            ) : (
              <CommentCard
                comment={data.caption}
                src={data.user.imageUrl}
                userId={data.user.id}
                userName={data.user.name}
              />
            )}
          </Box>
          <Text color={SUVA_GREY} fontSize="sm" p="10px">
            {getDateTime(data.createdAt, locale)}
          </Text>
        </Flex>
      </SimpleGrid>
    </Box>
  );
};
