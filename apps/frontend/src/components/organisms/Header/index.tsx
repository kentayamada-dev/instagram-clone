import {
  Flex,
  useColorMode,
  IconButton,
  Button,
  InputGroup,
  InputLeftElement,
  Input
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IconContext } from "react-icons";
import { HiSearch } from "react-icons/hi";
import { IoSunny, IoMoon } from "react-icons/io5";
import type { HeaderProps } from "./index.types";

export const Header = ({
  handleInputChange,
  inputValue
}: HeaderProps): JSX.Element => {
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
  const iconContextValue = React.useMemo(
    () => ({
      className: "global-class-name",
      color: "#707a83",
      style: {
        height: "24px",
        width: "24px"
      }
    }),
    []
  );

  return (
    <Flex
      align="center"
      boxShadow="rgb(4 17 29 / 25%) 0px 0px 8px 0px"
      h="72px"
      justify="space-between"
      pl="20px"
      pr="20px"
    >
      <Link href="/">
        <a>
          <Flex gap="10px">
            <Image
              alt="IgBid Logo"
              height={50}
              src="/static/instagram/logo.svg"
              width={50}
            />
            <Image
              alt="IgBid Text"
              height={50}
              src={`/static/instagram/text_${colorMode}.svg`}
              width={100}
            />
          </Flex>
        </a>
      </Link>
      <Flex gap={5}>
        <IconContext.Provider value={iconContextValue}>
          <InputGroup>
            <InputLeftElement
              // eslint-disable-next-line react/no-children-prop
              children={<HiSearch />}
              pointerEvents="none"
            />
            <Input
              onChange={handleInputChange}
              placeholder="Search items"
              type="text"
              value={inputValue}
            />
          </InputGroup>
        </IconContext.Provider>
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
