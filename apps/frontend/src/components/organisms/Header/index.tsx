import {
  Flex,
  useColorMode,
  IconButton,
  Button,
  useDisclosure,
  Box,
  useColorModeValue
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FiMenu } from "react-icons/fi";
import { IoSunny, IoMoon } from "react-icons/io5";
import { SiStorybook, SiGithub, SiApollographql } from "react-icons/si";
import { COLORS, LINKS } from "../../../constants";
import { MemorizedHeaderDrawer } from "../../molecules/HeaderDrawer";
import { ImageLinkColorMode } from "../../molecules/ImageLinkColorMode";

const { APOLLO_LINK, GITHUB_LINK, STORYBOOK_LINK } = LINKS;
const { BLACK_PEARL } = COLORS;

// eslint-disable-next-line max-statements
export const Header = (): JSX.Element => {
  const { toggleColorMode } = useColorMode();
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = (): void => onOpen();
  const handleClose = React.useCallback(() => onClose(), [onClose]);
  const iconByColorMode = useColorModeValue(<IoMoon />, <IoSunny />);
  const bgColor = useColorModeValue("", BLACK_PEARL);
  const getValueByLocale = <T, U>(valueT: T, valueU: U): T | U =>
    locale === "ja" ? valueT : valueU;
  const handleChangeLocale = async (): Promise<boolean> =>
    router.push({ pathname, query }, asPath, {
      locale: getValueByLocale("en", "ja")
    });
  const handleOpenStorybook = async (): Promise<boolean> =>
    router.push(STORYBOOK_LINK);
  const handleOpenGithub = async (): Promise<boolean> =>
    router.push(GITHUB_LINK);
  const handleOpenApolloGraphQL = async (): Promise<boolean> =>
    router.push(APOLLO_LINK);
  const handleColorMode = (): void => toggleColorMode();

  const instagramDarkImg = React.useMemo(
    () => ({
      alt: "Instagram Text Dark",
      src: "/static/instagram/text_dark.svg"
    }),
    []
  );

  const instagramLightImg = React.useMemo(
    () => ({
      alt: "Instagram Text Light",
      src: "/static/instagram/text_light.svg"
    }),
    []
  );

  return (
    <>
      <Flex
        align="center"
        bgColor={bgColor}
        justify="space-between"
        minH="8vh"
        pl="10px"
        pr="10px"
        shadow="lg"
        w="100%"
      >
        <ImageLinkColorMode
          darkImg={instagramDarkImg}
          height={50}
          href="/"
          lightImg={instagramLightImg}
          width={150}
        />
        <Flex align="center" gap={5}>
          <Button
            aria-label="Toggle Language Mode"
            minH="48px"
            minW="48px"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleChangeLocale}
          >
            {getValueByLocale("A", "あ")}
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
          <IconButton
            aria-label="Open Menu"
            display={{
              base: "flex",
              md: "none"
            }}
            icon={<FiMenu />}
            minH="48px"
            minW="48px"
            onClick={handleOpen}
          />
        </Flex>
      </Flex>
      <MemorizedHeaderDrawer handleClose={handleClose} isOpen={isOpen} />
    </>
  );
};
