import type { PostQuery } from "../../../generated";

export type PostDetailTemplateProps = { data: PostQuery["post"] };

export type PostDetailTemplateType = (props: PostDetailTemplateProps) => JSX.Element;
