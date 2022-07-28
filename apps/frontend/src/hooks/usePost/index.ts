import { useToast } from "@chakra-ui/react";
import React from "react";
import { fetcher } from "../../libs/graphql_request";
import { useLocale } from "../../libs/next_router";
import { getBlobUrlAndFile } from "../../utils/getBlobUrl";
import { getImageUrl } from "../../utils/getImageUrl";
import { wait } from "../../utils/wait";
import { useCurrentUser } from "../useCurrentUser";
import { useAllPosts } from "../usePosts";
import { useUser } from "../useUser";
import { POST_MUTATION } from "./schema";
import type { PostMutation, PostMutationVariables } from "../../generated";
import type { UsePostType } from "./type";

export const usePost: UsePostType = ({ handleClosePostModal }) => {
  const [postImageFile, setPostImageFile] = React.useState<Blob>();
  const { currentUser } = useCurrentUser();
  const { mutate: mutateAllPosts } = useAllPosts();
  const { mutate: mutateUser } = useUser({ userId: currentUser?.getCurrentUser.id ?? "" });
  const [isLoading, setIsLoading] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState("");
  const [caption, setCaption] = React.useState("");
  const fileSizeExceededErrorMessage = useLocale(
    "File size should be less than 10MB",
    "ファイルサイズは10MB以下にしてください"
  );
  const unexpectedErrorMessage = useLocale("An unexpected error has occurred", "予期しないエラーが発生しました");
  const fileNotSelectedErrorMessage = useLocale("Please select an image", "画像を選択してください");
  const postSuccessMessage = useLocale("Submission complete!", "投稿が完了しました！");
  const toast = useToast();
  const handleCancelPost = (): void => {
    setImageSrc("");
    setCaption("");
    handleClosePostModal();
  };
  const handleChangeCaption = (event: React.ChangeEvent<HTMLInputElement>): void => setCaption(event.target.value);

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
      try {
        setIsLoading(true);
        await wait(2);
        const imageUrl = await getImageUrl({ file: postImageFile });
        await fetcher<PostMutation, PostMutationVariables>(POST_MUTATION, {
          postArgs: {
            caption,
            imageUrl
          }
        });
        setIsLoading(false);
        handleCancelPost();
        toast({
          duration: 10000,
          isClosable: true,
          position: "top",
          status: "success",
          title: postSuccessMessage
        });
        await mutateAllPosts();
        await mutateUser();
      } catch (error) {
        toast({
          duration: 10000,
          isClosable: true,
          position: "top",
          status: "error",
          title: unexpectedErrorMessage
        });
      }
    }
  };

  const handleChangeImage = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
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
      toast({
        duration: 10000,
        isClosable: true,
        position: "top",
        status: "error",
        title: unexpectedErrorMessage
      });
    }
    // eslint-disable-next-line require-atomic-updates
    event.target.value = "";
  };

  return {
    handleCancelPost,
    handleChangeCaption,
    handleChangeImage,
    handleSubmitPost,
    imageSrc,
    isPostLoading: isLoading
  };
};
