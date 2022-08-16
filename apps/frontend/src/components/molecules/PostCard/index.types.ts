import type { UserCardProps } from "../userCard/index.types";

type PostCardProps = UserCardProps & {
  caption: string | null | undefined;
  createdAt: string | undefined;
  imageUrl: string | undefined;
};

export type PostCardType = (props: Partial<PostCardProps>) => JSX.Element;
