import { Button } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import type { ButtonLinkType } from "./index.types";

export const ButtonLink: ButtonLinkType = ({ height, href, width, src, alt, isExternal = false }) =>
  isExternal ? (
    <Button as="a" h={height} href={href} rel="noopener noreferrer" target="_blank" w={width}>
      <Image alt={alt} height={height} objectFit="contain" quality={100} src={src} width={width} />
    </Button>
  ) : (
    <NextLink href={href} passHref>
      <Button as="a" h={height} w={width}>
        <Image alt={alt} height={height} objectFit="contain" quality={100} src={src} width={width} />
      </Button>
    </NextLink>
  );
