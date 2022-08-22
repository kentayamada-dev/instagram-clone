import type { ImageColorModePropsType } from "../../atoms/ImageColorMode/index.types";
import type { LinkProps } from "@chakra-ui/react";

type ImageLinkColorModePropsType = ImageColorModePropsType &
  Partial<
    Pick<LinkProps, "height" | "width"> & {
      isExternal: boolean;
    }
  > & {
    href: string;
  };

export type ImageLinkColorModeType = (props: ImageLinkColorModePropsType) => JSX.Element;
