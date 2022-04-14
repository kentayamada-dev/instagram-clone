import type { ImageProps } from "next/image";

/* eslint-disable @typescript-eslint/indent */
type ImageLinkProps = Pick<ImageProps, "alt" | "src"> & {
  href: string;
  height: number;
  width: number;
};
/* eslint-enable @typescript-eslint/indent */

export type ImageLinkType = (props: ImageLinkProps) => JSX.Element;
