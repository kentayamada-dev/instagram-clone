export type StyledAvatarProps = {
  alt: string;
  size: number;
  src: string | undefined;
};

export type StyledAvatarType = (props: StyledAvatarProps) => JSX.Element;
