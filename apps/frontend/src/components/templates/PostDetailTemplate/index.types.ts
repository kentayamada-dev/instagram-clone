import type { PostQuery } from "../../../generated";

export type PostDetailTemplateProps = { data: PostQuery };

export type PostDetailTemplateType = (props: PostDetailTemplateProps) => JSX.Element;
