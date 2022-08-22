import type { ImageColorModeProps } from "../../atoms/ImageColorMode/index.types";
import type { LinkProps } from "@chakra-ui/react";

type ImageLinkColorModeProps = ImageColorModeProps &
  Partial<
    Pick<LinkProps, "height" | "width"> & {
      isExternal: boolean;
    }
  > & {
    href: string;
  };

export type ImageLinkColorModeType = (props: ImageLinkColorModeProps) => JSX.Element;
