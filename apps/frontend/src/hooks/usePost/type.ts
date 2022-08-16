type UsePostReturnType = {
  caption: string;
  handleCancelPost: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleChangeCaption: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleChangeImage: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleSubmitPost: () => Promise<void>;
  imageSrc: string;
  isPostLoading: boolean;
};

type UsePostProps = {
  handleClosePostModal: () => void;
};

export type UsePostType = (props: UsePostProps) => UsePostReturnType;
