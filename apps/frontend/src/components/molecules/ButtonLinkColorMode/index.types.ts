import type { ImageColorModeProps } from "../../atoms/ImageColorMode/index.types";

type ButtonLinkColorModeProps = ImageColorModeProps & {
  href: string;
  isExternal?: boolean | undefined;
};

export type ButtonLinkColorModeType = (props: ButtonLinkColorModeProps) => JSX.Element;
