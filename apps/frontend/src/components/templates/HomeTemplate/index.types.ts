import type { CurrentUserQuery } from "../../../generated";

type HomeTemplateProps = {
  currentUser: CurrentUserQuery["currentUser"];
};

export type HomeTemplateType = (props: HomeTemplateProps) => JSX.Element;
