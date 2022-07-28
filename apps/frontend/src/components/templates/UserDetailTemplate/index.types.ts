import type { GetUserQuery } from "../../../generated";

export type UserDetailTemplateProps = { data: GetUserQuery };

export type UserDetailTemplateType = (props: UserDetailTemplateProps) => JSX.Element;
