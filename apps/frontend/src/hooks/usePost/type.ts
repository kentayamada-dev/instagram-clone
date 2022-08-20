import type { Button, Input } from "@chakra-ui/react";

export type UsePostReturnType = {
  caption: string;
  handleCancelPost: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleChangeCaption: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleChangeImage: React.ComponentProps<typeof Input>["onChange"];
  handleSubmitPost: React.ComponentProps<typeof Button>["onClick"];
  imageSrc: string;
  isPostLoading: boolean;
};

type UsePostProps = {
  handleClosePostModal: () => void;
};

export type UsePostType = (props: UsePostProps) => UsePostReturnType;
