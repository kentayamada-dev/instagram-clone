import type { NextImageAltSrc } from "../../../libs/next/types";

export type ImageColorModePropsType = {
  darkImg: NextImageAltSrc;
  height: number;
  lightImg: NextImageAltSrc;
  width: number;
};

export type ImageColorModeType = (props: ImageColorModePropsType) => JSX.Element;
