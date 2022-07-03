import type { StyledAvatarProps } from "../../atoms/StyledAvatar/index.types";
import type { TextLinkProps } from "../../atoms/TextLink/index.types";

export type UserCardProps = Partial<
  Pick<StyledAvatarProps, "src"> &
    Pick<TextLinkProps, "isVisibleUnderline"> & {
      userId: string | undefined;
      userName: string | undefined;
    }
> &
  Pick<StyledAvatarProps, "size">;

export type UserCardType = (props: UserCardProps) => JSX.Element;
