import type { NextImageAltSrc } from "../../../libs/next/types";

export type ImageLinkPropsType = NextImageAltSrc & {
  height: number;
  href: string;
  width: number;
};

export type ImageLinkType = (props: ImageLinkPropsType) => JSX.Element;
