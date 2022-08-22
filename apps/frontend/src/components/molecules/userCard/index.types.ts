import type { UseFollowReturnType } from "../../../hooks/useFollow/type";
import type { NeverType } from "../../../types";
import type { StyledAvatarPropsType } from "../../atoms/StyledAvatar/index.types";
import type { FollowButtonPropsType } from "./components/FollowButton/index.types";
import type { LayoutProps } from "@chakra-ui/react";

type UserCardBasePropsType = Partial<
  Pick<LayoutProps, "width"> &
    Pick<StyledAvatarPropsType, "src"> & {
      isLink: boolean;
      shouldUserNameHidden: boolean;
      size: 35 | 50;
      userId: string | undefined;
      userName: string | undefined;
    }
>;

type FollowPropsType = Pick<FollowButtonPropsType, "buttonSize"> & UseFollowReturnType;

type UserCardDefaultPropsType = NeverType<FollowPropsType> & UserCardBasePropsType;

export type UserCardFollowPropsType = FollowPropsType & UserCardBasePropsType;

export type UserCardPropsType = UserCardDefaultPropsType | UserCardFollowPropsType;

export type UserCardType = (props: UserCardPropsType) => JSX.Element;
