import { Flex, IconButton, Button, Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { FiMenu } from "react-icons/fi";
import { IoSunny, IoMoon } from "react-icons/io5";
import { SiStorybook, SiGithub, SiApollographql } from "react-icons/si";
import { VscAdd } from "react-icons/vsc";
import { constants } from "../../../constants";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useHeader } from "../../../hooks/useHeader";
import { usePost } from "../../../hooks/usePost";
import { useLocale } from "../../../libs/next_router";
import { AvatarPopover } from "../../molecules/AvatarPopover";
import { HeaderDrawer } from "../../molecules/HeaderDrawer";
import { ImageLinkColorMode } from "../../molecules/ImageLinkColorMode";
import { PostModal } from "../../molecules/PostModal";
import type { HeaderType } from "./index.types";

const {
  COLORS: { SNOW, EBONY },
  LINKS: { APOLLO_LINK, GITHUB_LINK, STORYBOOK_LINK }
} = constants;

export const Header: HeaderType = () => {
  const { currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const isAuthenticated = Boolean(currentUser);
  const {
    handleChangeLocale,
    handleCloseDrawer,
    handleColorMode,
    isDrawerOpen,
    handleOpenDrawer,
    handleClosePostModal,
    handleOpenPostModal,
    isPostModalOpen,
    handleLogout
  } = useHeader();
  const { handleCancelPost, handleChangeCaption, handleChangeImage, handleSubmitPost, imageSrc, isPostLoading } =
    usePost({ handleClosePostModal });
  const bgColor = useColorModeValue(SNOW, EBONY);
  const iconByColorMode = useColorModeValue(<IoMoon />, <IoSunny />);
  const localeJa = useLocale("A", "あ");
  const instagramDarkImg = {
    alt: "Instagram Text Dark",
    src: "/static/instagram/text_dark.svg"
  };

  const instagramLightImg = {
    alt: "Instagram Text Light",
    src: "/static/instagram/text_light.svg"
  };

  React.useEffect(() => {
    // eslint-disable-next-line no-void
    void (async (): Promise<void> => {
      if (currentUser === null) {
        await mutateCurrentUser();
      }
    })();
  }, [currentUser, mutateCurrentUser]);

  return (
    <>
      <Flex
        align="center"
        bgColor={bgColor}
        h="inherit"
        justify="space-between"
        pl="10px"
        position="fixed"
        pr="10px"
        shadow="lg"
        w="100%"
        zIndex="1"
      >
        <ImageLinkColorMode darkImg={instagramDarkImg} height={50} href="/" lightImg={instagramLightImg} width={150} />
        <Flex align="center" gap={5}>
          {isAuthenticated ? (
            <>
              <IconButton
                aria-label="Post"
                icon={<VscAdd />}
                minH="48px"
                minW="48px"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={handleOpenPostModal}
              />
              <AvatarPopover
                alt="Avatar Image"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                handleLogout={handleLogout}
                size={35}
                src={currentUser?.getCurrentUser.imageUrl}
              />
            </>
          ) : null}
          <Box
            display={{
              base: isAuthenticated ? "none" : "contents"
            }}
          >
            <Button
              aria-label="Toggle Language Mode"
              minH="48px"
              minW="48px"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={handleChangeLocale}
            >
              {localeJa}
            </Button>
            <IconButton
              aria-label="Toggle Dark Mode"
              icon={iconByColorMode}
              minH="48px"
              minW="48px"
              onClick={handleColorMode}
            />
            <Box
              display={{
                base: "none",
                md: "contents"
              }}
            >
              <IconButton
                aria-label="Open Github"
                as="a"
                href={GITHUB_LINK}
                icon={<SiGithub />}
                minH="48px"
                minW="48px"
                rel="noopener noreferrer"
                target="_blank"
              />
              <IconButton
                aria-label="Open Apollo GraphQL"
                as="a"
                href={APOLLO_LINK}
                icon={<SiApollographql />}
                minH="48px"
                minW="48px"
                rel="noopener noreferrer"
                target="_blank"
              />
              <IconButton
                aria-label="Open Storybook"
                as="a"
                href={STORYBOOK_LINK}
                icon={<SiStorybook />}
                minH="48px"
                minW="48px"
                rel="noopener noreferrer"
                target="_blank"
              />
            </Box>
          </Box>
          <IconButton
            aria-label="Open Menu"
            display={{
              base: "flex",
              md: isAuthenticated ? "flex" : "none"
            }}
            icon={<FiMenu />}
            minH="48px"
            minW="48px"
            onClick={handleOpenDrawer}
          />
        </Flex>
      </Flex>
      <HeaderDrawer
        handleCloseDrawer={handleCloseDrawer}
        isAuthenticated={isAuthenticated}
        isDrawerOpen={isDrawerOpen}
      />
      <PostModal
        currentUserAvatarUrl={currentUser?.getCurrentUser.imageUrl}
        currentUserName={currentUser?.getCurrentUser.name}
        handleCancel={handleCancelPost}
        handleChangeCaption={handleChangeCaption}
        handleChangeImage={handleChangeImage}
        handleClose={handleClosePostModal}
        handleSubmit={handleSubmitPost}
        imagePreviewSrc={imageSrc}
        isLoading={isPostLoading}
        isOpen={isPostModalOpen}
      />
    </>
  );
};
