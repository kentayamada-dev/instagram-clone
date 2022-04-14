import type { StyledAvatarProps } from "../../atoms/StyledAvatar/index.types";

/* eslint-disable @typescript-eslint/indent */
export type UserCardProps = Partial<{
  userId: string | undefined;
  src: StyledAvatarProps["src"];
  userName: string | undefined;
}> &
  Pick<StyledAvatarProps, "size">;
/* eslint-enable @typescript-eslint/indent */

export type UserCardType = (props: UserCardProps) => JSX.Element;
