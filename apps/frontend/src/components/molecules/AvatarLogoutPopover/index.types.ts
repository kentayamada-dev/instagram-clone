import type { StyledAvatarPropsType } from "../../atoms/StyledAvatar/index.types";
import type { ButtonProps } from "@chakra-ui/react";

export type AvatarLogoutPopoverPropsType = StyledAvatarPropsType & {
  handleLogout: ButtonProps["onClick"];
};

export type AvatarLogoutPopoverType = (props: AvatarLogoutPopoverPropsType) => JSX.Element;
