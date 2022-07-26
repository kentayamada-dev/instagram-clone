export type UsePostReturnType = {
  handleCancelPost: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleChangeCaption: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeImage: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleSubmitPost: () => Promise<void>;
  imageSrc: string;
  isPostLoading: boolean;
};

type UsePostProps = {
  handleClosePostModal: () => void;
};

export type UsePostType = (props: UsePostProps) => UsePostReturnType;
