import type { ImageProps } from "next/image";

export type ImageLinkColorModeProps = {
  height: number;
  width: number;
  href: string;
  lightImg: {
    src: ImageProps["src"];
    alt: string;
  };
  darkImg: {
    src: ImageProps["src"];
    alt: string;
  };
};
