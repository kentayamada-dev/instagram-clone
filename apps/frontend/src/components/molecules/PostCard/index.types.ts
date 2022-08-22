import type { UserCardProps } from "../userCard/index.types";

type PostCardProps = Partial<
  Pick<UserCardProps, "src" | "userId" | "userName"> & {
    caption: string | null | undefined;
    createdAt: string;
    imageUrl: string;
  }
>;

export type PostCardType = (props: PostCardProps) => JSX.Element;
