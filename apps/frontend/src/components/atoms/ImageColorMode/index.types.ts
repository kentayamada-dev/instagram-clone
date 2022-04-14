import type { ImageProps } from "next/image";

export type ImageColorModeProps = {
  height: number;
  width: number;
  lightImg: {
    src: ImageProps["src"];
    alt: ImageProps["alt"];
  };
  darkImg: {
    src: ImageProps["src"];
    alt: ImageProps["alt"];
  };
};

export type ImageColorModeType = (props: ImageColorModeProps) => JSX.Element;
