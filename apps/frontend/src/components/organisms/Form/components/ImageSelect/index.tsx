import { Avatar, AvatarBadge, FormControl, FormErrorMessage, InputGroup } from "@chakra-ui/react";
import React from "react";
import { MdAddAPhoto } from "react-icons/md";
import { constants } from "../../../../../constants";
import { useLocale } from "../../../../../libs/next_router";
import { getBlobUrlAndFile } from "../../../../../utils/getBlobUrl";
import type { ImageSelectType } from "./index.types";

const {
  COLORS: { DODGER_BLUE }
} = constants;

export const ImageSelect: ImageSelectType = ({ errors, register, clearErrors, setError, setValue }) => {
  const [imagePreviewSrc, setImagePreviewSrc] = React.useState("");
  const fileSizeExceededErrorMessage = useLocale(
    "File size should be less than 10MB.",
    "ファイルサイズは10MB以下にしてください。"
  );
  const unexpectedErrorMessage = useLocale(
    "An unexpected error has occurred. Please wait a few minutes and try again.",
    "予期せぬエラーが発生しました。お時間をおいて再度お試しください。"
  );

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ref, onChange, ...rest } = register("file");
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const { files } = event.target;
    try {
      const { blobUrl, file } = await getBlobUrlAndFile({
        fileSizeExceededErrorMessage,
        files,
        maxFileSize: 5
      });
      setValue("file", file);
      setImagePreviewSrc(blobUrl);
      clearErrors("file");
    } catch (error) {
      if (error instanceof Error) {
        setError("file", {
          message: error.message,
          type: "custom"
        });
      } else {
        setError("file", {
          message: unexpectedErrorMessage,
          type: "custom"
        });
      }
    }
  };
  const handleClick = (): void => inputRef.current?.click();
  const errorMessage = errors.file?.message;

  return (
    <FormControl isInvalid={Boolean(errorMessage)}>
      <InputGroup justifyContent="center" onClick={handleClick}>
        <input
          accept="image/*"
          hidden
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onChange={handleImageChange}
          type="file"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          ref={(element): void => {
            ref(element);
            inputRef.current = element;
          }}
        />
        <Avatar
          _hover={{
            cursor: "pointer",
            opacity: 0.8
          }}
          size="2xl"
          src={imagePreviewSrc}
        >
          <AvatarBadge border="none" boxSize="1.25em">
            <MdAddAPhoto color={DODGER_BLUE} />
          </AvatarBadge>
        </Avatar>
      </InputGroup>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
