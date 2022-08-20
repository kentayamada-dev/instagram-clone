import type { PostQuery } from "../../../generated";

export type PostDetailTemplatePropsType = { data: PostQuery["post"] };

export type PostDetailTemplateType = (props: PostDetailTemplatePropsType) => JSX.Element;
