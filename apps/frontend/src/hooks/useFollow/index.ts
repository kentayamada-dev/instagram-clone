import { fetcher } from "../../libs/graphql_request";
import { wait } from "../../utils/wait";
import { useCurrentUser } from "../useCurrentUser";
import { useFollowers } from "../useFollowers";
import { useFollowing } from "../useFollowing";
import { useUser } from "../useUser";
import { FOLLOW_MUTATION, UNFOLLOW_MUTATION } from "./schema";
import type {
  FollowMutation,
  FollowMutationVariables,
  UnfollowMutation,
  UnfollowMutationVariables
} from "../../generated";
import type { GetFollowingUserExistenceType, GetFollowStateType, HandleFollowType, UseFollowType } from "./type";

export const useFollow: UseFollowType = ({ userId = "" }) => {
  const { currentUser, isCurrentUserLoading } = useCurrentUser();
  const currentUserId = currentUser?.id ?? "";
  const isCurrentUser = currentUserId === userId;
  const { mutateUser } = useUser({ userId: currentUserId });
  const { mutateCurrentUser } = useCurrentUser();
  const { mutateFollowers: mutateCurrentUserFollowers } = useFollowers({
    userId: currentUserId
  });
  const { mutateUser: mutateFollowedUser } = useUser({
    userId
  });
  const { mutateFollowing: mutateCurrentUserFollowing } = useFollowing({
    userId: currentUserId
  });
  const handleFollow: HandleFollowType = async ({ followInput, isFollowing }) => {
    await wait(2);
    if (isFollowing) {
      await fetcher<FollowMutation, FollowMutationVariables>(FOLLOW_MUTATION, {
        followInput
      });
    } else {
      await fetcher<UnfollowMutation, UnfollowMutationVariables>(UNFOLLOW_MUTATION, {
        followInput
      });
    }

    await mutateUser();
    await mutateFollowedUser();
    await mutateCurrentUser();
    await mutateCurrentUserFollowers();
    await mutateCurrentUserFollowing();
  };

  const getFollowingUserExistence: GetFollowingUserExistenceType = (id) =>
    currentUser?.following.nodes.findIndex((user) => user.followingUserId === id || id === currentUser.id) !== -1;

  const getFollowState: GetFollowStateType = (followingUserId) => {
    if (isCurrentUserLoading || !followingUserId || (!isCurrentUser && currentUserId === followingUserId)) {
      return null;
    }
    const isUserFollowing = getFollowingUserExistence(followingUserId);
    if (isUserFollowing) {
      return "unfollow";
    }

    return "follow";
  };

  return {
    getFollowState,
    handleFollow
  };
};
