export type UsePostReturnType = {
  handleChangeImage: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleSubmitPost: () => Promise<void>;
  handleCancelPost: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleChangeCaption: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPostLoading: boolean;
  imageSrc: string;
};

type UsePostProps = {
  handleClosePostModal: () => void;
};

export type UsePostType = (props: UsePostProps) => UsePostReturnType;
