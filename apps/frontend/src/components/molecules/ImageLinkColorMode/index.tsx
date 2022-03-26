import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { ImageColorMode } from "../../atoms/ImageColorMode";
import type { ImageLinkColorModeProps } from "./index.types";

export const ImageLinkColorMode = ({
  height,
  href,
  width,
  darkImg,
  lightImg
}: ImageLinkColorModeProps): JSX.Element => (
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
