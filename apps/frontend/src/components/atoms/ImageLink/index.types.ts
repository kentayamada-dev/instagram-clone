import type { NextImageAltSrc } from "../../../libs/next/types";

export type ImageLinkProps = NextImageAltSrc & {
  height: number;
  href: string;
  width: number;
};

export type ImageLinkType = (props: ImageLinkProps) => JSX.Element;
