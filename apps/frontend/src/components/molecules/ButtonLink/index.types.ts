import type { ImageLinkPropsType } from "../../atoms/ImageLink/index.types";
import type { ButtonProps } from "@chakra-ui/react";

type ButtonLinkPropsType = ImageLinkPropsType &
  Partial<
    Pick<ButtonProps, "height" | "width"> & {
      isExternal: boolean;
    }
  >;

export type ButtonLinkType = (props: ButtonLinkPropsType) => JSX.Element;
