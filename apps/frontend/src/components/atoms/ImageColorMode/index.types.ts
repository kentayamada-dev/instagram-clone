import type { ImageProps } from "next/image";

export type ImageColorModeProps = {
  darkImg: {
    alt: ImageProps["alt"];
    src: ImageProps["src"];
  };
  height: number;
  lightImg: {
    alt: ImageProps["alt"];
    src: ImageProps["src"];
  };
  width: number;
};

export type ImageColorModeType = (props: ImageColorModeProps) => JSX.Element;
