import type { StyledAvatarProps } from "../../atoms/StyledAvatar/index.types";
import type { ButtonProps } from "@chakra-ui/react";

export type AvatarLogoutPopoverProps = StyledAvatarProps & {
  handleLogout: ButtonProps["onClick"];
};

export type AvatarLogoutPopoverType = (props: AvatarLogoutPopoverProps) => JSX.Element;
