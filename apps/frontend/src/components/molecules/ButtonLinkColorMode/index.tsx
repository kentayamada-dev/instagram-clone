import { Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { ImageColorMode } from "../../atoms/ImageColorMode";
import type { ButtonLinkColorModeType } from "./index.types";

export const ButtonLinkColorMode: ButtonLinkColorModeType = ({
  height,
  href,
  width,
  darkImg,
  lightImg,
  isExternal = false
}) =>
  isExternal ? (
    <Button as="a" h={height} href={href} rel="noopener noreferrer" target="_blank" w={width}>
      <ImageColorMode darkImg={darkImg} height={height} lightImg={lightImg} width={width} />
    </Button>
  ) : (
    <NextLink href={href} passHref>
      <Button as="a" h={height} w={width}>
        <ImageColorMode darkImg={darkImg} height={height} lightImg={lightImg} width={width} />
      </Button>
    </NextLink>
  );
