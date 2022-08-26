export type UseLikeReturnType = {
  handleLike: () => Promise<void>;
  isPostLiked: boolean;
};

type UseLikeProps = {
  postId: string | undefined;
};

export type UseLikeType = (props: UseLikeProps) => UseLikeReturnType;
