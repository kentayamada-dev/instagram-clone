import type { FollowStateType, UseFollowReturnType } from "../../../../../hooks/useFollow/type";

type FollowButtonPropsType = Pick<UseFollowReturnType, "handleFollow"> & {
  followState: FollowStateType;
  userId: string;
};

export type FollowButtonType = (props: FollowButtonPropsType) => JSX.Element;
