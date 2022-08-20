export type CommentPropsType = {
  comment: string | undefined;
};

export type CommentType = (props: CommentPropsType) => JSX.Element;
