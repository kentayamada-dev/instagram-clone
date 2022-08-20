import type { ImageColorModeProps } from "../../atoms/ImageColorMode/index.types";

type ImageLinkColorModeProps = ImageColorModeProps & {
  href: string;
  isExternal?: boolean;
};

export type ImageLinkColorModeType = (props: ImageLinkColorModeProps) => JSX.Element;
