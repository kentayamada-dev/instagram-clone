import {
  VStack,
  HStack,
  Center,
  Text,
  Divider,
  useBreakpointValue,
  Spinner,
  Show,
  Heading,
  Grid,
  GridItem,
  Box
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { constants } from "../../../constants";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useFollow } from "../../../hooks/useFollow";
import { useUser } from "../../../hooks/useUser";
import { useUserPosts } from "../../../hooks/useUserPosts";
import { StyledAvatar } from "../../atoms/StyledAvatar";
import { FollowButton } from "../../molecules/userCard/components/FollowButton";
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
  const avatarSize = useBreakpointValue({ base: 80, md: 150 });
  const marginTop = useBreakpointValue({ base: 10, md: 50 });
  const { userPosts, handleMoreUserPosts, mutateUserPosts } = useUserPosts({ userId });
  const { handleFollow, getFollowState } = useFollow({ userId });
  const { currentUser } = useCurrentUser();
  const isNotCurrentUser = currentUser !== null && currentUser.id !== userId;

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
        lg: "1000px"
      }}
    >
      <HStack align="flex-start" p="12px" w="100%">
        <Box pl={{ base: "0", md: "16", sm: "10" }} pr={{ base: "10", md: "16" }}>
          <StyledAvatar alt="Avatar Image" size={avatarSize ?? 80} src={user?.imageUrl} />
        </Box>
        <VStack align="flex-start" spacing="8">
          <Grid
            gap="5"
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(5, 1fr)"
            }}
          >
            <GridItem colSpan={4}>
              <Heading as="h2" fontWeight="normal" noOfLines={1} size="lg">
                {user?.id}
              </Heading>
            </GridItem>
            {isNotCurrentUser ? (
              <GridItem alignItems="center" colSpan={1} display="flex" justifyContent="center">
                <FollowButton
                  buttonSize="sm"
                  followState={getFollowState(userId)}
                  handleFollow={handleFollow}
                  userId={userId}
                />
              </GridItem>
            ) : null}
          </Grid>
          <Show above="md">
            <Stats
              followersNumber={user?.follower.totalCount ?? null}
              followingNumber={user?.following.totalCount ?? null}
              postsNumber={user?.posts.totalCount ?? null}
              userId={user?.id}
              width="350px"
            />
          </Show>
          <Text fontSize="md" fontWeight="bold" noOfLines={3} w="100%">
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
        dataLength={userPosts?.nodes.length ?? 0}
        hasMore={userPosts?.pageInfo.hasNextPage ?? false}
        loader={
          <Center key={0} pb="5" pt="5">
            <Spinner size="lg" />
          </Center>
        }
        // eslint-disable-next-line react/jsx-handler-names
        next={handleMoreUserPosts}
      >
        <PostsList posts={userPosts?.nodes} userId={userId} />
      </InfiniteScroll>
    </VStack>
  );
};
