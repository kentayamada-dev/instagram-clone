import { Flex, IconButton, Button, Box, useColorModeValue } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { IoSunny, IoMoon } from "react-icons/io5";
import { SiStorybook, SiGithub, SiApollographql } from "react-icons/si";
import { VscAdd } from "react-icons/vsc";
import { constants } from "../../../constants";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useHeader } from "../../../hooks/useHeader";
import { usePost } from "../../../hooks/usePost";
import { useLocale } from "../../../lib/next_router";
import { AvatarLogoutPopover } from "../../molecules/AvatarLogoutPopover";
import { HeaderDrawer } from "../../molecules/HeaderDrawer";
import { ImageLinkColorMode } from "../../molecules/ImageLinkColorMode";
import { PostModal } from "../../molecules/PostModal";
import { Combobox } from "./components/Combobox";
import type { HeaderType } from "./index.types";

const {
  COLORS: { WHITE, EBONY },
  LINKS: { APOLLO_LINK, GITHUB_LINK, STORYBOOK_LINK }
} = constants;

export const Header: HeaderType = () => {
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

  const { handleCancelPost: handleCancelPostFunction, ...usePostValues } = usePost({});
  const handleCancelPost = (): void => {
    handleCancelPostFunction();
    handleClosePostModal();
  };
  const { currentUser } = useCurrentUser();
  const isAuthenticated = Boolean(currentUser);
  const bgColor = useColorModeValue(WHITE, EBONY);
  const iconByColorMode = useColorModeValue(<IoMoon />, <IoSunny />);
  const localeJa = useLocale("あ", "A");

  const instagramDarkImg = {
    alt: "Instagram Text Dark",
    src: "/static/instagram/text_dark.svg"
  };

  const instagramLightImg = {
    alt: "Instagram Text Light",
    src: "/static/instagram/text_light.svg"
  };

  return (
    <>
      <Flex
        align="center"
        bgColor={bgColor}
        justify="space-between"
        minH="inherit"
        pl={{
          base: 1,
          sm: 5
        }}
        position="fixed"
        pr={{
          base: 1,
          sm: 5
        }}
        shadow="lg"
        w="100%"
        zIndex="999"
      >
        <ImageLinkColorMode darkImg={instagramDarkImg} height={50} href="/" lightImg={instagramLightImg} width={150} />
        <Box
          display={{
            base: "none",
            md: "block"
          }}
          position="relative"
        >
          <Combobox />
        </Box>
        <Flex align="center" gap={5}>
          {isAuthenticated ? (
            <>
              <IconButton aria-label="Post" icon={<VscAdd />} minH="48px" minW="48px" onClick={handleOpenPostModal} />
              <AvatarLogoutPopover
                alt="Avatar Image"
                handleLogout={handleLogout}
                size={35}
                src={currentUser?.imageUrl}
              />
            </>
          ) : null}
          <Box
            display={{
              base: isAuthenticated ? "none" : "contents"
            }}
          >
            <Button aria-label="Toggle Language Mode" minH="48px" minW="48px" onClick={handleChangeLocale}>
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
        {...usePostValues}
        currentUserAvatarUrl={currentUser?.imageUrl}
        currentUserName={currentUser?.name}
        handleCancelPost={handleCancelPost}
        handleClosePostModal={handleClosePostModal}
        isPostModalOpen={isPostModalOpen}
      />
    </>
  );
};
