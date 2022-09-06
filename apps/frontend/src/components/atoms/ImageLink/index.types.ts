import type { NextImageAltSrc } from "../../../lib/next/types";
import type { LinkProps } from "@chakra-ui/react";

export type ImageLinkProps = NextImageAltSrc &
  Partial<
    Pick<LinkProps, "height" | "width"> & {
      isExternal: boolean;
    }
  > & {
    href: string;
  };

export type ImageLinkType = (props: ImageLinkProps) => JSX.Element;
