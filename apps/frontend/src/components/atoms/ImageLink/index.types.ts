import type { NextImageAltSrc } from "../../../libs/next/types";
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
