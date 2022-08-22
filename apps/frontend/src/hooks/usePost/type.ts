import type { ButtonProps, InputProps } from "@chakra-ui/react";

export type UsePostReturnType = {
  caption: string;
  handleCancelPost: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleChangeCaption: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleChangeImage: InputProps["onChange"];
  handleSubmitPost: ButtonProps["onClick"];
  imageSrc: string;
  isPostLoading: boolean;
};

type UsePostPropsType = {
  handleClosePostModal: () => void;
};

export type UsePostType = (props: UsePostPropsType) => UsePostReturnType;
