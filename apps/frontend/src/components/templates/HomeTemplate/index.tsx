import React from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useAllPosts } from "../../../hooks/usePosts";
import { useAllUsers } from "../../../hooks/useUsers";
import { wait } from "../../../utils/wait";
import { Feed } from "../../organisms/Feed";
import type { HomeTemplateType } from "./index.types";

export const HomeTemplate: HomeTemplateType = () => {
  const { currentUser, isError: isCurrentUserError } = useCurrentUser();
  const {
    posts: postsData,
    loadMorePosts: fetchMorePosts,
    isLoading: isLoadingPosts,
    mutate: mutatePosts,
    isError: isAllPostsError
  } = useAllPosts();
  const {
    users: usersData,
    mutate: mutateAllUsers,
    isError: isAllUsersError
  } = useAllUsers({
    currentUserId: currentUser?.getCurrentUser.id ?? ""
  });
  const isTooManyRequestsErrorOccurred = !isCurrentUserError && !isAllUsersError && !isAllPostsError;
  const [isLoading, setIsLoading] = React.useState(false);
  const loadMorePosts = async (): Promise<void> => {
    if (!isLoading && !isLoadingPosts && isTooManyRequestsErrorOccurred) {
      setIsLoading(true);
      await wait(2);
      await fetchMorePosts();
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    // eslint-disable-next-line no-void
    void (async (): Promise<void> => {
      if (isTooManyRequestsErrorOccurred) {
        if (postsData === null) {
          await mutatePosts();
        }
        if (usersData === null) {
          await mutateAllUsers();
        }
      }
    })();
  }, [
    mutatePosts,
    postsData,
    usersData,
    mutateAllUsers,
    isCurrentUserError,
    isAllUsersError,
    isAllPostsError,
    isTooManyRequestsErrorOccurred
  ]);

  return (
    <Feed currentUserData={currentUser} loadMorePosts={loadMorePosts} postsData={postsData} usersData={usersData} />
  );
};
