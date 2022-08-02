import type { StyledAvatarProps } from "../../atoms/StyledAvatar/index.types";
import type { MouseEventHandler } from "react";

type AvatarPopoverProps = StyledAvatarProps & {
  handleLogout: MouseEventHandler<HTMLButtonElement>;
};

export type AvatarPopoverType = (props: AvatarPopoverProps) => JSX.Element;
