import type { StyledAvatarProps } from "../../atoms/StyledAvatar/index.types";
import type { Button } from "@chakra-ui/react";

export type AvatarLogoutPopoverProps = StyledAvatarProps & {
  handleLogout: React.ComponentProps<typeof Button>["onClick"];
};

export type AvatarLogoutPopoverType = (props: AvatarLogoutPopoverProps) => JSX.Element;
