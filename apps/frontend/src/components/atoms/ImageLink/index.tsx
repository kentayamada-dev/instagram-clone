import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { NextImage } from "../NextImage";
import type { ImageLinkType } from "./index.types";

export const ImageLink: ImageLinkType = ({
  href,
  src,
  alt,
  isExternal = false,
  width = "inherit",
  height = "inherit"
}) =>
  isExternal ? (
    <Link h={height} href={href} isExternal rel="noopener noreferrer" w={width}>
      <NextImage alt={alt} src={src} />
    </Link>
  ) : (
    <NextLink href={href} passHref>
      <Link h={height} w={width}>
        <NextImage alt={alt} src={src} />
      </Link>
    </NextLink>
  );
