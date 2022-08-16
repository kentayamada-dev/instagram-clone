import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Image,
  Text,
  Center,
  Box,
  VStack,
  Textarea,
  IconButton
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import React from "react";
import { ImCross } from "react-icons/im";
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
  isLoading,
  caption
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleClick = (): void => {
    inputRef.current?.click();
  };
  const isImageSelected = Boolean(imagePreviewSrc);
  const { t } = useTranslation("common");

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={handleClose}
      size={{
        base: "xl",
        lg: "4xl"
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack justify="space-between">
            <IconButton aria-label="Cancel Post" icon={<ImCross />} onClick={handleCancel} />
            <Text>{t("createNewPost")}</Text>
            <Button
              aria-label="Share"
              isLoading={isLoading}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={handleSubmit}
              variant="primary"
            >
              {t("share")}
            </Button>
          </HStack>
        </ModalHeader>
        <ModalBody>
          <HStack align="flex-start">
            <Center
              h={{
                base: "300px",
                lg: "500px"
              }}
              minW="50%"
            >
              {isImageSelected ? (
                <Image h="100%" objectFit="cover" src={imagePreviewSrc} w="100%" />
              ) : (
                <VStack>
                  <Input
                    accept="image/*"
                    hidden
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onChange={handleChangeImage}
                    ref={inputRef}
                    type="file"
                  />
                  <Button colorScheme="blue" onClick={handleClick}>
                    {t("selectPhoto")}
                  </Button>
                </VStack>
              )}
            </Center>
            <Box height="inherit" w="100%">
              <VStack align="flex-start" height="inherit" pt={3}>
                <HStack spacing={5}>
                  <StyledAvatar alt="Avatar Image" size={30} src={currentUserAvatarUrl} />
                  <Text fontWeight="bold" noOfLines={1}>
                    {currentUserName}
                  </Text>
                </HStack>
                <Textarea
                  height="inherit"
                  mt={0}
                  onChange={handleChangeCaption}
                  placeholder={t("writeCaption")}
                  resize="none"
                  size="lg"
                  value={caption}
                  variant="unstyled"
                />
              </VStack>
            </Box>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
