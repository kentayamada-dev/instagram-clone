import type { ImageProps } from "next/image";

export type ImageColorModeProps = {
  height: number;
  width: number;
  lightImg: {
    src: ImageProps["src"];
    alt: string;
  };
  darkImg: {
    src: ImageProps["src"];
    alt: string;
  };
};

export type ImageColorModeType = (props: ImageColorModeProps) => JSX.Element;
