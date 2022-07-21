import type { ImageLinkProps } from "../../atoms/ImageLink/index.types";

type ButtonLinkProps = ImageLinkProps & {
  isExternal?: boolean | undefined;
};

export type ButtonLinkType = (props: ButtonLinkProps) => JSX.Element;
