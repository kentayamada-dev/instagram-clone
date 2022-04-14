import type { UserCardProps } from "../userCard/index.types";

type PostCardProps = UserCardProps & {
  imageUrl: string | undefined;
  caption: string | null | undefined;
};

export type PostCardType = (props: Partial<PostCardProps>) => JSX.Element;
