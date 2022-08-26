import { useToast } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import { fetcher } from "../../libs/graphql_request";
import { useLocale } from "../../libs/next_router";
import { getBlobUrlAndFile } from "../../utils/getBlobUrl";
import { getImageUrl } from "../../utils/getImageUrl";
import { wait } from "../../utils/wait";
import { useCurrentUser } from "../useCurrentUser";
import { usePosts } from "../usePosts";
import { useUser } from "../useUser";
import { useUserPosts } from "../useUserPosts";
import { POST_QUERY, UPLOAD_MUTATION } from "./schema";
import type { PostQuery, PostQueryVariables, UploadMutation, UploadMutationVariables } from "../../generated";
import type { UsePostReturnType, UsePostType } from "./type";

export const usePost: UsePostType = ({ postId = "", fallbackData }) => {
  const args: PostQueryVariables = {
    first: 6,
    postId,
    postIdExcluded: postId
  };
  const { data, mutate } = useSWR<PostQuery, Error>([POST_QUERY, args], {
    ...(fallbackData && { fallbackData })
  });
  const post = data?.post;
  const [postImageFile, setPostImageFile] = React.useState<Blob>();
  const { currentUser } = useCurrentUser();
  const { mutatePosts } = usePosts();
  const { mutateUserPosts } = useUserPosts({ userId: currentUser?.id });
  const { mutateUser } = useUser({ userId: currentUser?.id });
  const [isLoading, setIsLoading] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState("");
  const [caption, setCaption] = React.useState("");
  const fileSizeExceededErrorMessage = useLocale(
    "File size should be less than 10MB",
    "ファイルサイズは10MB以下にしてください"
  );
  const unexpectedErrorMessage = useLocale("An unexpected error has occurred", "予期しないエラーが発生しました");
  const fileNotSelectedErrorMessage = useLocale("Please select a photo", "写真を選択してください");
  const postSuccessMessage = useLocale("Submission complete!", "投稿が完了しました！");
  const toast = useToast();
  const handleCancelPost = (): void => {
    setImageSrc("");
    setCaption("");
  };
  const handleChangeCaption = (event: React.ChangeEvent<HTMLTextAreaElement>): void => setCaption(event.target.value);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleSubmitPost: UsePostReturnType["handleSubmitPost"] = async () => {
    if (imageSrc === "") {
      toast({
        duration: 3000,
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
        await fetcher<UploadMutation, UploadMutationVariables>(UPLOAD_MUTATION, {
          uploadInput: {
            caption,
            imageUrl
          }
        });
        setIsLoading(false);
        handleCancelPost();
        toast({
          duration: 3000,
          isClosable: true,
          position: "top",
          status: "success",
          title: postSuccessMessage
        });
        await mutatePosts();
        await mutateUserPosts();
        await mutateUser();
      } catch (error) {
        toast({
          duration: 3000,
          isClosable: true,
          position: "top",
          status: "error",
          title: unexpectedErrorMessage
        });
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleChangeImage: UsePostReturnType["handleChangeImage"] = async (event) => {
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
        duration: 3000,
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
    caption,
    handleCancelPost,
    handleChangeCaption,
    handleChangeImage,
    handleSubmitPost,
    imageSrc,
    isPostLoading: isLoading,
    mutatePost: mutate,
    post
  };
};
