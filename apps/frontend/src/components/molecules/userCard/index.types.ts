import type { UseFollowReturnType } from "../../../hooks/useFollow/type";
import type { NeverType } from "../../../types";
import type { StyledAvatarProps } from "../../atoms/StyledAvatar/index.types";
import type { FollowButtonProps } from "./components/FollowButton/index.types";
import type { LayoutProps } from "@chakra-ui/react";

type UserCardBaseProps = Partial<
  Pick<LayoutProps, "width"> &
    Pick<StyledAvatarProps, "src"> & {
      isLink: boolean;
      shouldUserNameHidden: boolean;
      size: 35 | 50;
      userId: string | undefined;
      userName: string | undefined;
    }
>;

type FollowProps = Pick<FollowButtonProps, "buttonSize"> & UseFollowReturnType;

type UserCardDefaultProps = NeverType<FollowProps> & UserCardBaseProps;

export type UserCardFollowProps = FollowProps & UserCardBaseProps;

export type UserCardProps = UserCardDefaultProps | UserCardFollowProps;

export type UserCardType = (props: UserCardProps) => JSX.Element;
