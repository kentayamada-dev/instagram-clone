import type { AvatarLogoutPopoverProps } from "../../components/molecules/AvatarLogoutPopover/index.types";
import type { Button } from "@chakra-ui/react";
import type { ComponentProps } from "react";

export type UseHeaderReturnType = Pick<AvatarLogoutPopoverProps, "handleLogout"> & {
  handleChangeLocale: ComponentProps<typeof Button>["onClick"];
  handleCloseDrawer: () => void;
  handleClosePostModal: () => void;
  handleColorMode: () => void;
  handleOpenDrawer: () => void;
  handleOpenPostModal: () => void;
  isDrawerOpen: boolean;
  isPostModalOpen: boolean;
};

export type UseHeaderType = () => UseHeaderReturnType;
