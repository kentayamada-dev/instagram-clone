import type { FollowMutationVariables } from "../../generated";

type HandleFollowPropsType = FollowMutationVariables & {
  isFollowing: boolean;
};

export type HandleFollowType = (props: HandleFollowPropsType) => Promise<void>;

export type FollowStateType = "follow" | "unfollow" | null;

export type GetFollowStateType = (followingUserId: string | undefined) => FollowStateType;

export type UseFollowReturnType = {
  getFollowState: GetFollowStateType;
  handleFollow: HandleFollowType;
};

type UseFollowPropsType = {
  userId: string | undefined;
};

export type UseFollowType = (props: UseFollowPropsType) => UseFollowReturnType;

export type GetFollowingUserExistenceType = (id: string) => boolean;
