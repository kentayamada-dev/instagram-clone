import { VStack, HStack, Center, Text, Divider, useBreakpointValue, Spinner, Show, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { constants } from "../../../constants";
import { useUser } from "../../../hooks/useUser";
import { useUserPosts } from "../../../hooks/useUserPosts";
import { StyledAvatar } from "../../atoms/StyledAvatar";
import { PostsList } from "../../organisms/PostsList";
import { Stats } from "./components/Stats";
import type { UserDetailTemplateType } from "./index.types";

const {
  COLORS: { SUVA_GREY }
} = constants;

export const UserDetailTemplate: UserDetailTemplateType = ({ data }) => {
  const router = useRouter();
  const [isInitialDataFetched, setIsInitialDataFetched] = React.useState(false);
  // eslint-disable-next-line no-undefined
  const userId = typeof router.query["userId"] === "string" ? router.query["userId"] : undefined;
  const { user } = useUser({ fallbackData: data, userId });
  const avatarSize = useBreakpointValue({ base: 90, md: 150 });
  const marginTop = useBreakpointValue({ base: 10, md: 50 });
  const { userPosts, handleMoreUserPosts, mutateUserPosts } = useUserPosts({ userId });
  const isPostsThere = Boolean(userPosts?.edges && userPosts.edges.length > 0);

  React.useEffect(() => {
    if (userId && !userPosts && !isInitialDataFetched) {
      setIsInitialDataFetched(true);
      void (async (): Promise<void> => {
        await mutateUserPosts();
      })();
    }
  }, [isInitialDataFetched, mutateUserPosts, userId, userPosts]);

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
      <HStack align="flex-start" spacing="10" w="100%">
        <Center
          p={{
            base: "3",
            lg: "8"
          }}
        >
          <StyledAvatar alt="Avatar Image" size={avatarSize ?? 90} src={user?.imageUrl} />
        </Center>
        <VStack align="flex-start" spacing="8" w="100%">
          <Heading as="h2" fontWeight="normal" size="lg">
            {user?.id}
          </Heading>
          <Show above="md">
            <Stats
              followersNumber={user?.follower.totalCount ?? null}
              followingNumber={user?.following.totalCount ?? null}
              postsNumber={user?.posts.totalCount ?? null}
              userId={user?.id}
              width="350px"
            />
          </Show>
          <Text fontSize="md" fontWeight="bold" w="50%">
            {user?.name}
          </Text>
        </VStack>
      </HStack>
      <Show below="md">
        <Divider borderColor={SUVA_GREY} />
        <Stats
          followersNumber={user?.follower.totalCount ?? null}
          followingNumber={user?.following.totalCount ?? null}
          justifyContent="space-around"
          postsNumber={user?.posts.totalCount ?? null}
          userId={user?.id}
        />
      </Show>
      <InfiniteScroll
        dataLength={userPosts?.edges.length ?? 0}
        hasMore={userPosts?.pageInfo.hasNextPage ?? false}
        loader={
          <Center key={0} pb="5" pt="5">
            <Spinner size="lg" />
          </Center>
        }
        // eslint-disable-next-line react/jsx-handler-names
        next={handleMoreUserPosts}
        // eslint-disable-next-line react/forbid-component-props
        style={{
          overflow: isPostsThere ? "auto" : "none"
        }}
      >
        <PostsList posts={userPosts?.edges} userId={userId} />
      </InfiniteScroll>
    </VStack>
  );
};
