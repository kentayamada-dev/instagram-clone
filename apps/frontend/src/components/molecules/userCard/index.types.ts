import type { StyledAvatarProps } from "../../atoms/StyledAvatar/index.types";

export type UserCardProps = Partial<
  Pick<StyledAvatarProps, "src"> & {
    shouldUserNameHidden?: boolean;
    userId: string | undefined;
    userName: string | undefined;
  }
> &
  Pick<StyledAvatarProps, "size">;

export type UserCardType = (props: UserCardProps) => JSX.Element;
