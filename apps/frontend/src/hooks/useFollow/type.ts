import type { FollowMutationVariables } from "../../generated";

type HandleFollowProps = FollowMutationVariables & {
  isFollowing: boolean;
};

export type HandleFollowType = (props: HandleFollowProps) => Promise<void>;

export type FollowStateType = "follow" | "unfollow" | null;

export type GetFollowStateType = (followingUserId: string | undefined) => FollowStateType;

export type UseFollowReturnType = {
  getFollowState: GetFollowStateType;
  handleFollow: HandleFollowType;
};

type UseFollowProps = {
  userId: string | undefined;
};

export type UseFollowType = (props: UseFollowProps) => UseFollowReturnType;

export type GetFollowingUserExistenceType = (id: string) => boolean;
