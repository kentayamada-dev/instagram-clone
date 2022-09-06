import { Avatar, AvatarBadge, FormControl, FormErrorMessage, Input, InputGroup } from "@chakra-ui/react";
import React from "react";
import { MdAddAPhoto } from "react-icons/md";
import { constants } from "../../../../../constants";
import { useLocale } from "../../../../../lib/next_router";
import { getBlobUrlAndFile } from "../../../../../utils/getBlobUrl";
import type { ImageSelectType } from "./index.types";
import type { InputProps } from "@chakra-ui/react";

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
  const { ref, onChange, ...rest } = register("file");
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleImageChange: InputProps["onChange"] = async (event) => {
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
        <Input
          accept="image/*"
          hidden
          onChange={handleImageChange}
          type="file"
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
