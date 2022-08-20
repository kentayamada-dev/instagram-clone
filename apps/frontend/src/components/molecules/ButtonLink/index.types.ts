import type { ImageLinkPropsType } from "../../atoms/ImageLink/index.types";

type ButtonLinkPropsType = ImageLinkPropsType & {
  isExternal?: boolean;
};

export type ButtonLinkType = (props: ButtonLinkPropsType) => JSX.Element;
