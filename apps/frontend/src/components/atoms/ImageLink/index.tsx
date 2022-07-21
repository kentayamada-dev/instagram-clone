import { Link } from "@chakra-ui/react";
import Image from "next/image";
import type { ImageLinkType } from "./index.types";

export const ImageLink: ImageLinkType = ({ href, height, width, src, alt }) => (
  <Link h={height} href={href} isExternal>
    <Image alt={alt} height={height} objectFit="contain" quality={100} src={src} width={width} />
  </Link>
);
