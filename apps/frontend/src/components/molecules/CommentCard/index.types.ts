import type { StyledAvatarPropsType } from "../../atoms/StyledAvatar/index.types";
import type { CommentPropsType } from "./components/Comment/index.types";

type CommentCardPropsType = CommentPropsType &
  Pick<StyledAvatarPropsType, "src"> & {
    userId: string | undefined;
    userName: string | undefined;
  };

export type CommentCardType = (props: CommentCardPropsType) => JSX.Element;
