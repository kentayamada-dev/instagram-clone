import { Link } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import type { ImageLinkType } from "./index.types";

export const ImageLink: ImageLinkType = ({ href, height, width, src, alt }) => (
  <NextLink href={href} passHref>
    <Link h={height}>
      <Image alt={alt} height={height} objectFit="contain" quality={100} src={src} width={width} />
    </Link>
  </NextLink>
);
