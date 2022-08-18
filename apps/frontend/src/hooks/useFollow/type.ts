import type { FollowMutationVariables } from "../../generated";

type HandleFollowProps = FollowMutationVariables & {
  isFollowing: boolean;
};

export type HandleFollowType = (props: HandleFollowProps) => Promise<void>;

export type UseFollowReturnType = {
  getFollowState: (followingUserId: string | undefined) => "follow" | "unfollow" | null;
  handleFollow: HandleFollowType;
};

type UseFollowProps = {
  userId: string | undefined;
};

export type UseFollowType = (props: UseFollowProps) => UseFollowReturnType;

export type GetFollowStateType = (followingUserId: string | undefined) => "follow" | "unfollow" | null;

export type GetFollowingUserExistenceType = (id: string) => boolean;
