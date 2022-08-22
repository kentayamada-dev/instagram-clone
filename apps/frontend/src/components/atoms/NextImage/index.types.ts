import type { NextImageAltSrc } from "../../../libs/next/types";
import type { BoxProps } from "@chakra-ui/react";

type NextImagePropsType = NextImageAltSrc & Partial<Pick<BoxProps, "height" | "width">>;

export type NextImageType = (props: NextImagePropsType) => JSX.Element;
