import { Flex, useColorMode, IconButton, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { IoSunny, IoMoon } from "react-icons/io5";
import { SiStorybook, SiGithub } from "react-icons/si";
import { ImageLinkColorMode } from "../../atoms/ImageLinkColorMode";
import { SearchBox } from "../../atoms/SearchBox";

// eslint-disable-next-line max-statements
export const Header = (): JSX.Element => {
  const { colorMode, toggleColorMode: handleColorMode } = useColorMode();
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;
  const getIconByColorMode = (): JSX.Element =>
    colorMode === "dark" ? <IoSunny /> : <IoMoon />;
  const getLabelByLocale = (): "A" | "あ" => (locale === "ja" ? "A" : "あ");
  const handleChangeLocale = async (): Promise<boolean> =>
    router.push({ pathname, query }, asPath, {
      locale: locale === "ja" ? "en" : "ja"
    });
  const handleOpenStorybook = async (): Promise<boolean> =>
    router.push("/storybook");
  const handleOpenGithub = async (): Promise<boolean> =>
    router.push("https://github.com/kentayamada-dev/instagram-clone");
  const darkImg = React.useMemo(
    () => ({
      alt: "Instagram Text Dark",
      src: "/static/instagram/text_dark.svg"
    }),
    []
  );

  const lightImg = React.useMemo(
    () => ({
      alt: "Instagram Text Light",
      src: "/static/instagram/text_light.svg"
    }),
    []
  );

  return (
    <Flex
      align="center"
      justify="space-between"
      minH="8vh"
      pl="20px"
      pr="20px"
      shadow="lg"
      w="100%"
    >
      <ImageLinkColorMode
        darkImg={darkImg}
        height={50}
        href="/"
        lightImg={lightImg}
        width={150}
      />
      <Flex gap={5}>
        <SearchBox />
        <IconButton
          aria-label="Open Github"
          icon={<SiGithub />}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleOpenGithub}
        />
        <IconButton
          aria-label="Open Storybook"
          icon={<SiStorybook />}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleOpenStorybook}
        />
        <Button
          aria-label="Toggle Language Mode"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleChangeLocale}
        >
          {getLabelByLocale()}
        </Button>
        <IconButton
          aria-label="Toggle Dark Mode"
          icon={getIconByColorMode()}
          onClick={handleColorMode}
        />
      </Flex>
    </Flex>
  );
};
