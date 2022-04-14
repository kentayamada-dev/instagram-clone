import { useToast } from "@chakra-ui/react";
import React from "react";
import { useLocale } from "../../libs/next_router";
import {
  GetAllPostsDocument,
  usePostMutation
} from "../../types/generated/types";
import { getBlobUrlAndFile } from "../../utils/getBlobUrl";
import { getImageUrl } from "../../utils/getImageUrl";
import type { UsePostType } from "./types";

export const usePost: UsePostType = () => {
  const [postImageFile, setPostImageFile] = React.useState<Blob>();
  const [imageSrc, setImageSrc] = React.useState("");
  const [caption, setCaption] = React.useState("");
  const fileSizeExceededErrorMessage = useLocale(
    "File size should be less than 10MB",
    "ファイルサイズは10MB以下にしてください"
  );
  const fileNotSelectedErrorMessage = useLocale(
    "Please select an image",
    "画像を選択してください"
  );
  const postSuccessMessage = useLocale(
    "Submission complete!",
    "投稿が完了しました！"
  );
  const toast = useToast();
  const [post, { loading: isPostLoading }] = usePostMutation();
  const handleCancelPost = (): void => {
    setImageSrc("");
    setCaption("");
  };

  const handleSubmitPost = async (): Promise<void> => {
    if (imageSrc === "") {
      toast({
        duration: 10000,
        isClosable: true,
        position: "top",
        status: "error",
        title: fileNotSelectedErrorMessage
      });
    } else if (postImageFile instanceof Blob) {
      const imageUrl = await getImageUrl({ file: postImageFile });
      await post({
        onCompleted: () => {
          handleCancelPost();
          toast({
            duration: 10000,
            isClosable: true,
            position: "top",
            status: "success",
            title: postSuccessMessage
          });
        },
        refetchQueries: [GetAllPostsDocument],
        variables: {
          postInput: {
            caption,
            imageUrl
          }
        }
      });
    }
  };
  const handleChangeImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const { files } = event.target;
    try {
      const { blobUrl, file } = await getBlobUrlAndFile({
        fileSizeExceededErrorMessage,
        files,
        maxFileSize: 5
      });
      setImageSrc(blobUrl);
      setPostImageFile(file);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          duration: 10000,
          isClosable: true,
          position: "top",
          status: "error",
          title: error.message
        });
      }
    }

    // eslint-disable-next-line require-atomic-updates
    event.target.value = "";
  };
  const handleChangeCaption = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setCaption(event.target.value);

  return {
    handleCancelPost,
    handleChangeCaption,
    handleChangeImage,
    handleSubmitPost,
    imageSrc,
    isPostLoading
  };
};
