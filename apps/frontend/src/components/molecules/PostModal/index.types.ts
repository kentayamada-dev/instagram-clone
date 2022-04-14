export type PostModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleChangeCaption: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeImage: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  handleSubmit: () => Promise<void>;
  handleCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  imagePreviewSrc: string;
  currentUserName: string | undefined;
  currentUserAvatarUrl: string | undefined;
  isLoading: boolean;
};

export type PostModalType = (props: PostModalProps) => JSX.Element;
