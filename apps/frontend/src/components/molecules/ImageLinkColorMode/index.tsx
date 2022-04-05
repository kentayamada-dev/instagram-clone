import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { ImageColorMode } from "../../atoms/ImageColorMode";
import type { ImageLinkColorModeType } from "./index.types";

export const ImageLinkColorMode: ImageLinkColorModeType = ({
  height,
  href,
  width,
  darkImg,
  lightImg
}) => (
  <NextLink href={href} passHref>
    <Link h={height} w={width}>
      <ImageColorMode
        darkImg={darkImg}
        height={height}
        lightImg={lightImg}
        width={width}
      />
    </Link>
  </NextLink>
);
