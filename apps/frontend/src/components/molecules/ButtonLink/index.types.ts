import type { ImageLinkProps } from "../../atoms/ImageLink/index.types";

type ButtonLinkProps = ImageLinkProps & {
  isExternal?: boolean;
};

export type ButtonLinkType = (props: ButtonLinkProps) => JSX.Element;
