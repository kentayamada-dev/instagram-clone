import type { GetPostQuery } from "../../../types/generated/types";

export type PostDetailTemplateProps = { data: GetPostQuery["getPost"] };

export type PostDetailTemplateType = (props: PostDetailTemplateProps) => JSX.Element;
