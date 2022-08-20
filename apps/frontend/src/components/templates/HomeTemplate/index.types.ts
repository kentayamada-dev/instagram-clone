import type { CurrentUserQuery } from "../../../generated";

type HomeTemplatePropsType = {
  currentUser: CurrentUserQuery["currentUser"];
};

export type HomeTemplateType = (props: HomeTemplatePropsType) => JSX.Element;
