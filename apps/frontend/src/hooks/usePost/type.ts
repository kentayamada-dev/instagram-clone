import type { PostQuery } from "../../generated";
import type { ButtonProps, InputProps } from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import type { KeyedMutator } from "swr";

export type UsePostReturnType = {
  caption: string;
  handleCancelPost: () => void;
  handleChangeCaption: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleChangeImage: InputProps["onChange"];
  handleSubmitPost: ButtonProps["onClick"];
  imageSrc: string;
  isPostLoading: boolean;
  mutatePost: KeyedMutator<PostQuery>;
  post: PostQuery["post"] | undefined;
};

type UsePostProps = {
  fallbackData?: PostQuery;
  postId?: string | undefined;
};

export type UsePostType = (props: UsePostProps) => UsePostReturnType;
