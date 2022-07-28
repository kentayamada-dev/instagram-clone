import type { GetPostQuery } from "../../../generated";

export type PostDetailTemplateProps = { data: GetPostQuery["getPost"] };

export type PostDetailTemplateType = (props: PostDetailTemplateProps) => JSX.Element;
