export type UseHeaderReturnType = {
  handleChangeLocale: () => Promise<void>;
  handleCloseDrawer: () => void;
  handleClosePostModal: () => void;
  handleColorMode: () => void;
  handleLogout: () => Promise<void>;
  handleOpenDrawer: () => void;
  handleOpenPostModal: () => void;
  isDrawerOpen: boolean;
  isPostModalOpen: boolean;
};

export type UseHeaderType = () => UseHeaderReturnType;
