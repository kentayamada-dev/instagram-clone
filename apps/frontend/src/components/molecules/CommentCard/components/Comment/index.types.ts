export type CommentProps = {
  comment: string | undefined;
};

export type CommentType = (props: CommentProps) => JSX.Element;
