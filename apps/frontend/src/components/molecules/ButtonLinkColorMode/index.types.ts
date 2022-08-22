import type { ImageColorModePropsType } from "../../atoms/ImageColorMode/index.types";
import type { ButtonProps } from "@chakra-ui/react";

type ButtonLinkColorModePropsType = ImageColorModePropsType &
  Partial<
    Pick<ButtonProps, "height" | "width"> & {
      isExternal: boolean;
    }
  > & {
    href: string;
  };

export type ButtonLinkColorModeType = (props: ButtonLinkColorModePropsType) => JSX.Element;
