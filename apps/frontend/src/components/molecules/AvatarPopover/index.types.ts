import type { MouseEventHandler } from "react";

export type AvatarPopoverProps = {
  imageSrc: string;
  handleLogout: MouseEventHandler<HTMLButtonElement>;
};

export type AvatarPopoverType = (props: AvatarPopoverProps) => JSX.Element;
