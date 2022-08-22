import { Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { NextImage } from "../../atoms/NextImage";
import type { ButtonLinkType } from "./index.types";

export const ButtonLink: ButtonLinkType = ({
  href,
  src,
  alt,
  isExternal = false,
  height = "inherit",
  width = "inherit"
}) =>
  isExternal ? (
    <Button as="a" h={height} href={href} rel="noopener noreferrer" target="_blank" w={width}>
      <NextImage alt={alt} src={src} />
    </Button>
  ) : (
    <NextLink href={href} passHref>
      <Button as="a" h={height} w={width}>
        <NextImage alt={alt} src={src} />
      </Button>
    </NextLink>
  );
