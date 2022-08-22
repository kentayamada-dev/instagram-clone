import {
  Box,
  Center,
  SimpleGrid,
  useColorModeValue,
  Text,
  VStack,
  Show,
  Hide,
  Flex,
  Divider,
  Heading
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { constants } from "../../../constants";
import { getDateTime } from "../../../libs/date_fns";
import { TextLink } from "../../atoms/TextLink";
import { CommentCard } from "../../molecules/CommentCard";
import { UserCard } from "../../molecules/userCard";
import { PostsList } from "../../organisms/PostsList";
import type { PostDetailTemplateType } from "./index.types";

const {
  COLORS: { GAINSBORO, BLACK_PEARL, WHITE, EBONY, SUVA_GREY }
} = constants;

export const PostDetailTemplate: PostDetailTemplateType = ({ data }) => {
  const borderColor = useColorModeValue(GAINSBORO, BLACK_PEARL);
  const bgColor = useColorModeValue(WHITE, EBONY);
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation("postDetail");

  return (
    <Box h="fit-content" margin="0 auto" pb={{ base: "24px", md: "0" }} w={{ base: "100%", md: "inherit" }}>
      <Box p={{ base: "0", md: "12px" }}>
        <SimpleGrid
          bgColor={bgColor}
          border={`${borderColor} solid 1px`}
          columns={{ base: 1, md: 2 }}
          h={{ base: "100%", md: "500px" }}
          w={{ lg: "900px", md: "700px", sm: "100%" }}
        >
          <Show below="md">
            <Box p="12px" w="100%">
              <UserCard shouldUserNameHidden src={data.user.imageUrl} userId={data.user.id} userName={data.user.name} />
            </Box>
          </Show>
          <Box minH="400px" pos="relative">
            <NextImage alt="Post Image" layout="fill" objectFit="cover" priority quality={100} src={data.imageUrl} />
          </Box>
          <Flex flexDir="column" justify="space-between" minH="200px">
            <Box>
              <Hide below="md">
                <Box p="12px" w="90%">
                  <UserCard
                    shouldUserNameHidden
                    src={data.user.imageUrl}
                    userId={data.user.id}
                    userName={data.user.name}
                  />
                </Box>
              </Hide>
              {data.caption === null ? (
                <Center pt={{ base: "50px", md: "100px" }}>
                  <VStack>
                    <Heading as="h2" size="md">
                      {t("noComments")}
                    </Heading>
                    <Text>{t("startConversation")}</Text>
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
            <Text as="time" color={SUVA_GREY} fontSize="sm" p="10px">
              {getDateTime(data.createdAt, locale)}
            </Text>
          </Flex>
        </SimpleGrid>
      </Box>
      {data.user.posts.nodes.length ? (
        <>
          <Box p={{ base: "24px 0 12px 0", md: "24px 12px 12px 12px" }}>
            <Divider borderColor={SUVA_GREY} />
            <Text color={SUVA_GREY} pl={{ base: "12px", md: 0 }} pt="24px">
              <Flex>
                {locale === "en" && (
                  <Box>
                    {t("morePostsFrom")}
                    &nbsp;
                  </Box>
                )}
                <Box maxW="200px">
                  <TextLink color="initial" href={`/${data.user.id}`} text={data.user.id} />
                </Box>
                {locale === "ja" && t("morePostsFrom")}
              </Flex>
            </Text>
          </Box>
          <PostsList posts={data.user.posts.nodes} userId={data.user.id} />
        </>
      ) : null}
    </Box>
  );
};
