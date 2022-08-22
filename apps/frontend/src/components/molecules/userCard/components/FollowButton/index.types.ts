import type { FollowStateType, UseFollowReturnType } from "../../../../../hooks/useFollow/type";
import type { ButtonProps } from "@chakra-ui/react";

export type FollowButtonPropsType = Pick<UseFollowReturnType, "handleFollow"> & {
  buttonSize?: ButtonProps["size"] | undefined;
  followState: FollowStateType;
  userId: string | undefined;
};

export type FollowButtonType = (props: FollowButtonPropsType) => JSX.Element | null;
