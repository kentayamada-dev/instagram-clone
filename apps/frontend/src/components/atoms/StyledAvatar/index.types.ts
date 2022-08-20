import type { NextImageAltSrc } from "../../../libs/next/types";

export type StyledAvatarPropsType = Pick<NextImageAltSrc, "alt"> & {
  size: number;
  src: string | undefined;
};

export type StyledAvatarType = (props: StyledAvatarPropsType) => JSX.Element;
