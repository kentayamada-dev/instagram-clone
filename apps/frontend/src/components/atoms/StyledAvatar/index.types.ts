export type StyledAvatarProps = {
  src: string | undefined;
  size: number;
  alt: string;
};

export type StyledAvatarType = (props: StyledAvatarProps) => JSX.Element;
