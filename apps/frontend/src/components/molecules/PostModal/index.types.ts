type PostModalProps = {
  caption: string;
  currentUserAvatarUrl: string | undefined;
  currentUserName: string | undefined;
  handleCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleChangeCaption: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleChangeImage: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleClose: () => void;
  handleSubmit: () => Promise<void>;
  imagePreviewSrc: string;
  isLoading: boolean;
  isOpen: boolean;
};

export type PostModalType = (props: PostModalProps) => JSX.Element;
