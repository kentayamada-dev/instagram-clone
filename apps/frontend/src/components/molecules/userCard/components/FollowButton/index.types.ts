import type { FollowStateType, UseFollowReturnType } from "../../../../../hooks/useFollow/type";

type FollowButtonProps = Pick<UseFollowReturnType, "handleFollow"> & {
  followState: FollowStateType;
  userId: string;
};

export type FollowButtonType = (props: FollowButtonProps) => JSX.Element;
