import type { NextImageAltSrc } from "../../../lib/next/types";
import type { BoxProps } from "@chakra-ui/react";

type NextImageProps = NextImageAltSrc & Partial<Pick<BoxProps, "height" | "width">>;

export type NextImageType = (props: NextImageProps) => JSX.Element;
