import type { UserQuery } from "../../../generated";

export type UserDetailTemplatePropsType = { data: UserQuery };

export type UserDetailTemplateType = (props: UserDetailTemplatePropsType) => JSX.Element;
