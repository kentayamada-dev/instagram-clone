import type { NextImageAltSrc } from "../../../libs/next/types";
import type { BoxProps } from "@chakra-ui/react";

type NextImageProps = NextImageAltSrc & Partial<Pick<BoxProps, "height" | "width">>;

export type NextImageType = (props: NextImageProps) => JSX.Element;
