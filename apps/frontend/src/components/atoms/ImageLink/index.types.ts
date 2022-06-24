import type { ImageProps } from "next/image";

export type ImageLinkProps = Pick<ImageProps, "alt" | "src"> & {
  href: string;
  height: number;
  width: number;
};

export type ImageLinkType = (props: ImageLinkProps) => JSX.Element;
