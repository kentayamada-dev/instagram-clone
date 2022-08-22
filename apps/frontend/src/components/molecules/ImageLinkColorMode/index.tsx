import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { ImageColorMode } from "../../atoms/ImageColorMode";
import type { ImageLinkColorModeType } from "./index.types";

export const ImageLinkColorMode: ImageLinkColorModeType = ({
  href,
  darkImg,
  lightImg,
  isExternal = false,
  width = "inherit",
  height = "inherit"
}) =>
  isExternal ? (
    <Link h={height} href={href} isExternal w={width}>
      <ImageColorMode darkImg={darkImg} lightImg={lightImg} />
    </Link>
  ) : (
    <NextLink href={href} passHref>
      <Link h={height} w={width}>
        <ImageColorMode darkImg={darkImg} lightImg={lightImg} />
      </Link>
    </NextLink>
  );
