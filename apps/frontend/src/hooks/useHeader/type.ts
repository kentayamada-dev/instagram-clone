export type UseHeaderReturnType = {
  handleChangeLocale: () => Promise<void>;
  handleColorMode: () => void;
  handleOpenGithub: () => Promise<boolean>;
  handleOpenApolloGraphQL: () => Promise<boolean>;
  handleOpenStorybook: () => Promise<boolean>;
  handleOpenDrawer: () => void;
  handleCloseDrawer: () => void;
  isDrawerOpen: boolean;
};

export type UseHeaderType = () => UseHeaderReturnType;
