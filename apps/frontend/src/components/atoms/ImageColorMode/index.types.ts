import type { NextImageAltSrc } from "../../../libs/next/types";

export type ImageColorModeProps = {
  darkImg: NextImageAltSrc;
  height: number;
  lightImg: NextImageAltSrc;
  width: number;
};

export type ImageColorModeType = (props: ImageColorModeProps) => JSX.Element;
