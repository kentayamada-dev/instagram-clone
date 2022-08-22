import type { ImageLinkProps } from "../../atoms/ImageLink/index.types";
import type { ButtonProps } from "@chakra-ui/react";

type ButtonLinkProps = ImageLinkProps &
  Partial<
    Pick<ButtonProps, "height" | "width"> & {
      isExternal: boolean;
    }
  >;

export type ButtonLinkType = (props: ButtonLinkProps) => JSX.Element;
