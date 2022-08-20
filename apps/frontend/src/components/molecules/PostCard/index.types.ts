import type { UserCardPropsType } from "../userCard/index.types";

type PostCardPropsType = Partial<
  Pick<UserCardPropsType, "src" | "userId" | "userName"> & {
    caption: string | null | undefined;
    createdAt: string;
    imageUrl: string;
  }
>;

export type PostCardType = (props: PostCardPropsType) => JSX.Element;
