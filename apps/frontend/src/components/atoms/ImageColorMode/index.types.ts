import type { NextImageAltSrc } from "../../../libs/next/types";
import type { BoxProps } from "@chakra-ui/react";

export type ImageColorModeProps = Partial<Pick<BoxProps, "height" | "width">> & {
  darkImg: NextImageAltSrc;
  lightImg: NextImageAltSrc;
};

export type ImageColorModeType = (props: ImageColorModeProps) => JSX.Element;
