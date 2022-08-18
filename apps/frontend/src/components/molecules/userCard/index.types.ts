import type { UseFollowReturnType } from "../../../hooks/useFollow/type";
import type { NeverType } from "../../../types";
import type { StyledAvatarProps } from "../../atoms/StyledAvatar/index.types";

type UserCardBaseProps = Partial<
  Pick<StyledAvatarProps, "src"> & {
    isLink: boolean;
    shouldUserNameHidden: boolean;
    userId: string | undefined;
    userName: string | undefined;
  }
> &
  Pick<StyledAvatarProps, "size">;

type FollowProps = UseFollowReturnType;

type UserCardDefaultProps = NeverType<FollowProps> & UserCardBaseProps;

export type UserCardFollowProps = FollowProps & UserCardBaseProps;

export type UserCardProps = UserCardDefaultProps | UserCardFollowProps;

export type UserCardType = (props: UserCardProps) => JSX.Element;
