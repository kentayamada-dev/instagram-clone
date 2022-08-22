import type { NextImageAltSrc } from "../../../libs/next/types";

export type StyledAvatarProps = Pick<NextImageAltSrc, "alt"> & {
  size: number;
  src: string | undefined;
};

export type StyledAvatarType = (props: StyledAvatarProps) => JSX.Element;
