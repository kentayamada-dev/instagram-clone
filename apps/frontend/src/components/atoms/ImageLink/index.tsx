import { Link } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import type { ImageLinkProps } from "./index.types";

export const ImageLink = ({
  href,
  height,
  width,
  src,
  alt
}: ImageLinkProps): JSX.Element => (
  <NextLink href={href} passHref>
    <Link h={height}>
      <Image
        alt={alt}
        height={height}
        objectFit="contain"
        quality={100}
        src={src}
        width={width}
      />
    </Link>
  </NextLink>
);
