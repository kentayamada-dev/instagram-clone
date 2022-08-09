import { VStack, HStack, Center, Text, Divider, useBreakpointValue, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useUser } from "../../../hooks/useUser";
import { useUserPosts } from "../../../hooks/useUserPosts";
import { wait } from "../../../utils/wait";
import { StyledAvatar } from "../../atoms/StyledAvatar";
import { PostsList } from "../../organisms/PostsList";
import type { UserDetailTemplateType } from "./index.types";

export const UserDetailTemplate: UserDetailTemplateType = ({ data }) => {
  const router = useRouter();
  const userId = typeof router.query["userId"] === "string" ? router.query["userId"] : null;
  const { user } = useUser({
    fallbackData: data,
    userId: userId ?? ""
  });
  const avatarSize = useBreakpointValue({ base: 90, md: 150 });
  const marginTop = useBreakpointValue({ base: 10, md: 50 });
  const { userPosts, isUserPostsLoading, loadMoreUserPosts, mutateUserPosts } = useUserPosts({
    userId: userId ?? ""
  });
  const [isLoadingMorePosts, setIsLoadingMorePosts] = React.useState(false);
  const handleMoreUserPosts = async (): Promise<void> => {
    if (!isLoadingMorePosts && !isUserPostsLoading) {
      setIsLoadingMorePosts(true);
      await wait(2);
      await loadMoreUserPosts();
      setIsLoadingMorePosts(false);
    }
  };

  React.useEffect(() => {
    if (userId && !userPosts) {
      // eslint-disable-next-line no-void
      void (async (): Promise<void> => {
        await mutateUserPosts();
      })();
    }
  }, [mutateUserPosts, userId, userPosts]);

  return (
    <VStack
      mb="30px"
      ml="auto"
      mr="auto"
      mt={marginTop ?? 20}
      spacing={10}
      w={{
        base: "100%",
        lg: "900px"
      }}
    >
      <HStack align="flex-start" w="100%">
        <Center w="30%">
          <StyledAvatar alt="Avatar Image" size={avatarSize ?? 90} src={user?.imageUrl} />
        </Center>
        <Text fontSize="3xl" w="70%">
          {user?.name}
        </Text>
      </HStack>
      <Divider />
      <InfiniteScroll
        hasMore={userPosts?.pageInfo.hasNextPage}
        // eslint-disable-next-line react/jsx-handler-names, @typescript-eslint/no-misused-promises
        loadMore={handleMoreUserPosts}
        loader={
          <Center key={0} pb="5" pt="5">
            <Spinner size="lg" />
          </Center>
        }
        // eslint-disable-next-line react/forbid-component-props
        style={{
          width: "inherit"
        }}
      >
        <PostsList posts={userPosts?.edges} userId={userId ?? ""} />
      </InfiniteScroll>
    </VStack>
  );
};
