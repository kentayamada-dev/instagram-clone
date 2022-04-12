import { ApolloError } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import React from "react";
import { useLocale } from "../../../libs/next_router";
import {
  useGetAllPostsQuery,
  useGetAllUsersQuery,
  useGetCurrentUserQuery
} from "../../../types/generated/types";
import { Feed } from "../../organisms/Feed";
import type { HomeTemplateType } from "./index.types";

export const HomeTemplate: HomeTemplateType = () => {
  const {
    data: postsData,
    fetchMore: fetchMorePosts,
    loading: isLoading
  } = useGetAllPostsQuery({
    variables: { first: 5 }
  });
  const { data: usersData } = useGetAllUsersQuery({
    variables: { first: 5 }
  });
  const { data: currentUserData } = useGetCurrentUserQuery();
  const toast = useToast();
  const tooManyRequestsErrorMessage = useLocale(
    "Please try again after some time",
    "時間をおいてから再度お試しください"
  );

  const loadMorePosts = async (): Promise<void> => {
    if (!isLoading) {
      try {
        await fetchMorePosts({
          variables: {
            after: postsData?.getAllPosts.pageInfo.endCursor,
            first: 5
          }
        });
      } catch (error) {
        if (error instanceof ApolloError) {
          const errorStatus: number | undefined =
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            error.graphQLErrors[0]?.extensions["exception"].status;
          if (errorStatus === 429) {
            toast({
              duration: 10000,
              isClosable: true,
              position: "top",
              status: "error",
              title: tooManyRequestsErrorMessage
            });
          }
        }
      }
    }
  };

  React.useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return (
    <Feed
      currentUserData={currentUserData}
      loadMorePosts={loadMorePosts}
      postsData={postsData}
      usersData={usersData}
    />
  );
};
