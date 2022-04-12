import {
  Flex,
  IconButton,
  Button,
  Box,
  useColorModeValue
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { FiMenu } from "react-icons/fi";
import { IoSunny, IoMoon } from "react-icons/io5";
import { SiStorybook, SiGithub, SiApollographql } from "react-icons/si";
import { constants } from "../../../constants";
import { useHeader } from "../../../hooks/useHeader";
import { useLocale } from "../../../libs/next_router";
import { useGetCurrentUserQuery } from "../../../types/generated/types";
import { AvatarPopover } from "../../molecules/AvatarPopover";
import { HeaderDrawer } from "../../molecules/HeaderDrawer";
import { ImageLinkColorMode } from "../../molecules/ImageLinkColorMode";
import type { HeaderType } from "./index.types";

const { ACCESS_TOKEN_KEY_NAME } = constants;

export const Header: HeaderType = () => {
  const router = useRouter();
  const { data: currentUser } = useGetCurrentUserQuery();
  const isAuthenticated = Boolean(currentUser);
  const handleLogout = async (): Promise<void> => {
    await axios.delete("/api/cookie/", {
      data: {
        key: ACCESS_TOKEN_KEY_NAME,
        value: ""
      }
    });
    router.reload();
  };
  const {
    handleChangeLocale,
    handleCloseDrawer,
    handleColorMode,
    handleOpenApolloGraphQL,
    handleOpenGithub,
    handleOpenStorybook,
    isDrawerOpen,
    handleOpenDrawer
  } = useHeader();
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

  return (
    <>
      <Flex
        align="center"
        backdropFilter="blur(10px)"
        h="inherit"
        justify="space-between"
        pl="10px"
        position="fixed"
        pr="10px"
        shadow="lg"
        w="100%"
        zIndex="1"
      >
        <ImageLinkColorMode
          darkImg={instagramDarkImg}
          height={50}
          href="/"
          lightImg={instagramLightImg}
          width={150}
        />
        <Flex align="center" gap={5}>
          {currentUser && (
            <AvatarPopover
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              handleLogout={handleLogout}
              imageSrc={currentUser.getCurrentUser.imageUrl}
            />
          )}
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
                icon={<SiGithub />}
                minH="48px"
                minW="48px"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={handleOpenGithub}
              />
              <IconButton
                aria-label="Open Apollo GraphQL"
                icon={<SiApollographql />}
                minH="48px"
                minW="48px"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={handleOpenApolloGraphQL}
              />
              <IconButton
                aria-label="Open Storybook"
                icon={<SiStorybook />}
                minH="48px"
                minW="48px"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={handleOpenStorybook}
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
    </>
  );
};
