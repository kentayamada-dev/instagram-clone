import type { ImageColorModeProps } from "../../atoms/ImageColorMode/index.types";

type ButtonLinkColorModeProps = ImageColorModeProps & {
  href: string;
};

export type ButtonLinkColorModeType = (props: ButtonLinkColorModeProps) => JSX.Element;
