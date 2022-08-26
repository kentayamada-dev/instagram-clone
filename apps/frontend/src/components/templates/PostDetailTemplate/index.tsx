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
  Heading,
  Button,
  Skeleton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import NextImage from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";
import { constants } from "../../../constants";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useFollow } from "../../../hooks/useFollow";
import { useLike } from "../../../hooks/useLike";
import { useLikes } from "../../../hooks/useLikes";
import { usePost } from "../../../hooks/usePost";
import { getDateTime } from "../../../libs/date_fns";
import { TextLink } from "../../atoms/TextLink";
import { CommentCard } from "../../molecules/CommentCard";
import { UserCard } from "../../molecules/userCard";
import { PostsList } from "../../organisms/PostsList";
import { UsersList } from "../../organisms/UsersList";
import type { PostDetailTemplateType } from "./index.types";
import type { ButtonProps } from "@chakra-ui/react";

const {
  COLORS: { GAINSBORO, BLACK_PEARL, WHITE, EBONY, SUVA_GREY, RADICAL_RED }
} = constants;

export const PostDetailTemplate: PostDetailTemplateType = ({ data }) => {
  const router = useRouter();
  // eslint-disable-next-line no-undefined
  const postId = typeof router.query["postId"] === "string" ? router.query["postId"] : undefined;
  const { post } = usePost({
    fallbackData: data,
    postId
  });
  const [isInitialDataFetched, setIsInitialDataFetched] = React.useState(false);
  const { currentUser } = useCurrentUser();
  const { handleFollow, getFollowState } = useFollow({ userId: post?.user.id });
  const { likes, handleMoreLikes, mutateLikes } = useLikes({ postId });
  const { isOpen, onOpen, onClose: handleClose } = useDisclosure();
  const [isLikeLoading, setIsLikeLoading] = React.useState(false);
  const borderColor = useColorModeValue(GAINSBORO, BLACK_PEARL);
  const bgColor = useColorModeValue(WHITE, EBONY);
  const { locale } = router;
  const { t } = useTranslation("postDetail");
  const { handleLike, isPostLiked } = useLike({ postId });
  const handleButtonClick = (): void => {
    if (currentUser) {
      void (async (): Promise<void> => {
        setIsLikeLoading(true);
        await handleLike();
        setIsLikeLoading(false);
      })();
    } else {
      void router.push("/");
    }
  };

  const handleOpenModal: ButtonProps["onClick"] = () => {
    if (currentUser) {
      onOpen();
    } else {
      void router.push("/");
    }
  };

  React.useEffect(() => {
    if (!isInitialDataFetched && postId) {
      setIsInitialDataFetched(true);
      void (async (): Promise<void> => {
        if (!likes) {
          await mutateLikes();
        }
      })();
    }
  }, [isInitialDataFetched, likes, mutateLikes, postId]);

  return (
    <>
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
                <UserCard
                  shouldUserNameHidden
                  src={post?.user.imageUrl}
                  userId={post?.user.id}
                  userName={post?.user.name}
                />
              </Box>
            </Show>
            <Box minH="400px" pos="relative">
              {post ? (
                <NextImage
                  alt="Post Image"
                  layout="fill"
                  objectFit="cover"
                  priority
                  quality={100}
                  src={post.imageUrl}
                />
              ) : (
                <Skeleton h="100%" w="100%" />
              )}
            </Box>
            <Flex flexDir="column" justify="space-between" minH="200px">
              <Box>
                <Hide below="md">
                  <Box p="12px" w="90%">
                    <UserCard
                      shouldUserNameHidden
                      src={post?.user.imageUrl}
                      userId={post?.user.id}
                      userName={post?.user.name}
                    />
                  </Box>
                </Hide>
                {post?.caption === null ? (
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
                    comment={post?.caption}
                    src={post?.user.imageUrl}
                    userId={post?.user.id}
                    userName={post?.user.name}
                  />
                )}
              </Box>
              <Box p="3">
                <VStack align="flex-start">
                  <Button aria-label="Like post" isDisabled={isLikeLoading} onClick={handleButtonClick} variant="icon">
                    {isPostLiked ? <AiFillHeart color={RADICAL_RED} size={30} /> : <AiOutlineHeart size={30} />}
                  </Button>
                  {post ? (
                    // eslint-disable-next-line react/jsx-no-useless-fragment
                    <Center height="30px">
                      {post.likes.totalCount > 0 ? (
                        <Button height="fit-content" onClick={handleOpenModal} variant="text">
                          {t("likeCount", { count: post.likes.totalCount })}
                        </Button>
                      ) : (
                        <Text mt="0">{t("likeMessage")}</Text>
                      )}
                    </Center>
                  ) : (
                    <Skeleton h="20px" w="100px" />
                  )}
                </VStack>
                {post ? (
                  <Text as="time" color={SUVA_GREY} fontSize="sm">
                    {getDateTime(post.createdAt, locale)}
                  </Text>
                ) : (
                  <Skeleton height="20px" w="50px" />
                )}
              </Box>
            </Flex>
          </SimpleGrid>
        </Box>
        {post && post.user.posts.nodes.length > 0 ? (
          <>
            <Box p={{ base: "24px 0 12px 0", md: "24px 12px 12px 12px" }}>
              <Divider borderColor={SUVA_GREY} />
              <Flex fontSize="sm" pt="24px">
                {locale === "en" && (
                  <Box color={SUVA_GREY} fontWeight="bold">
                    {t("morePostsFrom")}
                    &nbsp;
                  </Box>
                )}
                <TextLink color="initial" href={`/${post.user.id}`} text={post.user.id} />
                <Box color={SUVA_GREY} fontWeight="bold">
                  {locale === "ja" && t("morePostsFrom")}
                </Box>
              </Flex>
            </Box>
            <PostsList posts={post.user.posts.nodes} userId={post.user.id} />
          </>
        ) : null}
      </Box>
      <Modal isCentered isOpen={isOpen} onClose={handleClose} variant="likesList">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">{t("likes")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box h="400px" id="scrollableDiv" overflowY="auto">
              {likes && likes.nodes.length > 0 ? (
                <InfiniteScroll
                  dataLength={likes.nodes.length}
                  hasMore={likes.pageInfo.hasNextPage}
                  loader={
                    <Center key={0} pb="5" pt="5">
                      <Spinner size="lg" />
                    </Center>
                  }
                  // eslint-disable-next-line react/jsx-handler-names
                  next={handleMoreLikes}
                  scrollableTarget="scrollableDiv"
                >
                  <Box w="inherit">
                    <UsersList getFollowState={getFollowState} handleFollow={handleFollow} userNodes={likes.nodes} />
                  </Box>
                </InfiniteScroll>
              ) : null}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
