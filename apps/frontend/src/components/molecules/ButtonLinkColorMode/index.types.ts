import type { ImageColorModeProps } from "../../atoms/ImageColorMode/index.types";
import type { ButtonProps } from "@chakra-ui/react";

type ButtonLinkColorModeProps = ImageColorModeProps &
  Partial<
    Pick<ButtonProps, "height" | "width"> & {
      isExternal: boolean;
    }
  > & {
    href: string;
  };

export type ButtonLinkColorModeType = (props: ButtonLinkColorModeProps) => JSX.Element;
