export type UseHeaderReturnType = {
  handleChangeLocale: () => Promise<void>;
  handleLogout: () => Promise<void>;
  handleColorMode: () => void;
  handleOpenGithub: () => Promise<boolean>;
  handleOpenApolloGraphQL: () => Promise<boolean>;
  handleOpenStorybook: () => Promise<boolean>;
  handleOpenDrawer: () => void;
  handleCloseDrawer: () => void;
  handleOpenPostModal: () => void;
  handleClosePostModal: () => void;
  isDrawerOpen: boolean;
  isPostModalOpen: boolean;
};

export type UseHeaderType = () => UseHeaderReturnType;
