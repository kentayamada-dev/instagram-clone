import type { GetUserQuery } from "../../../types/generated/types";

export type UserDetailTemplateProps = { data: GetUserQuery["getUser"] };

export type UserDetailTemplateType = (props: UserDetailTemplateProps) => JSX.Element;
