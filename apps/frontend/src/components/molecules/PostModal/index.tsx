import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Image,
  Text,
  Center
} from "@chakra-ui/react";
import React from "react";
import { useTypeSafeTranslation } from "../../../libs/next_translate";
import { StyledAvatar } from "../../atoms/StyledAvatar";
import type { PostModalType } from "./index.types";

export const PostModal: PostModalType = ({
  isOpen,
  handleClose,
  imagePreviewSrc,
  currentUserName,
  currentUserAvatarUrl,
  handleChangeCaption,
  handleChangeImage,
  handleCancel,
  handleSubmit,
  isLoading
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleClick = (): void => {
    inputRef.current?.click();
  };
  const isImageSelected = Boolean(imagePreviewSrc);
  const { t } = useTypeSafeTranslation("common");
  const handleSubmitPost = async (): Promise<void> => {
    await handleSubmit();
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("createNewPost")}</ModalHeader>
        <ModalBody>
          {isImageSelected ? (
            <>
              <Center w="100%">
                <Image maxH="300px" src={imagePreviewSrc} />
              </Center>
              <HStack mt="6">
                <StyledAvatar
                  alt="Avatar Image"
                  size={30}
                  src={currentUserAvatarUrl}
                />
                <Text fontWeight="bold" noOfLines={1}>
                  {currentUserName}
                </Text>
              </HStack>
              <Input
                onChange={handleChangeCaption}
                placeholder={t("writeCaption")}
                variant="flushed"
              />
            </>
          ) : (
            <>
              <Input
                accept="image/*"
                hidden
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onChange={handleChangeImage}
                ref={inputRef}
                type="file"
              />
              <Button colorScheme="blue" onClick={handleClick}>
                {t("selectFromComputer")}
              </Button>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="cancel" mr={3} onClick={handleCancel}>
            {t("cancel")}
          </Button>
          <Button
            colorScheme="blue"
            isLoading={isLoading}
            mr={3}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleSubmitPost}
          >
            {t("submit")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
