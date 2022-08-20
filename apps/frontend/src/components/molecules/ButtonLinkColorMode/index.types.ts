import type { ImageColorModePropsType } from "../../atoms/ImageColorMode/index.types";

type ButtonLinkColorModePropsType = ImageColorModePropsType & {
  href: string;
  isExternal?: boolean;
};

export type ButtonLinkColorModeType = (props: ButtonLinkColorModePropsType) => JSX.Element;
