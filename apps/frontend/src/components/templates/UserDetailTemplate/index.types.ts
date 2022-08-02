import type { UserQuery } from "../../../generated";

export type UserDetailTemplateProps = { data: UserQuery };

export type UserDetailTemplateType = (props: UserDetailTemplateProps) => JSX.Element;
