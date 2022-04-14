import type { StyledAvatarProps } from "../../atoms/StyledAvatar/index.types";
import type { MouseEventHandler } from "react";

export type AvatarPopoverProps = StyledAvatarProps & {
  handleLogout: MouseEventHandler<HTMLButtonElement>;
};

export type AvatarPopoverType = (props: AvatarPopoverProps) => JSX.Element;
