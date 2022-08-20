import type { StyledAvatarPropsType } from "../../atoms/StyledAvatar/index.types";
import type { Button } from "@chakra-ui/react";

export type AvatarLogoutPopoverPropsType = StyledAvatarPropsType & {
  handleLogout: React.ComponentProps<typeof Button>["onClick"];
};

export type AvatarLogoutPopoverType = (props: AvatarLogoutPopoverPropsType) => JSX.Element;
