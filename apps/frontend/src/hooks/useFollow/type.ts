import type { FollowMutationVariables } from "../../generated";

type HandleFollowProps = FollowMutationVariables & {
  isFollowing: boolean;
};

export type FollowStateType = "follow" | "unfollow" | null;

export type UseFollowReturnType = {
  getFollowState: (followingUserId: string | undefined) => FollowStateType;
  handleFollow: (props: HandleFollowProps) => Promise<void>;
};

type UseFollowProps = {
  userId: string | undefined;
};

export type UseFollowType = (props: UseFollowProps) => UseFollowReturnType;

export type GetFollowingUserExistenceType = (id: string) => boolean;
