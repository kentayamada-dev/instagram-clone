import type { ImageColorModePropsType } from "../../atoms/ImageColorMode/index.types";

type ImageLinkColorModePropsType = ImageColorModePropsType & {
  href: string;
  isExternal?: boolean;
};

export type ImageLinkColorModeType = (props: ImageLinkColorModePropsType) => JSX.Element;
