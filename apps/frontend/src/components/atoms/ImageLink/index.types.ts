import type { ImageProps } from "next/image";

export type ImageLinkProps = Pick<ImageProps, "alt" | "src"> & {
  height: number;
  href: string;
  width: number;
};

export type ImageLinkType = (props: ImageLinkProps) => JSX.Element;
