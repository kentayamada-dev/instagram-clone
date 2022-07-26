import type { GetUserQuery } from "../../../types/generated/types";

export type UserDetailTemplateProps = { data: GetUserQuery };

export type UserDetailTemplateType = (props: UserDetailTemplateProps) => JSX.Element;
