import type { ImageProps } from "next/image";

export type StyledAvatarProps = Pick<ImageProps, "alt" | "src"> & {
  size: number;
};

export type StyledAvatarType = (props: StyledAvatarProps) => JSX.Element;
