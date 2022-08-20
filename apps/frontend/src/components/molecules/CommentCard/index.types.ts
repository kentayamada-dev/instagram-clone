import type { StyledAvatarProps } from "../../atoms/StyledAvatar/index.types";
import type { CommentProps } from "./components/Comment/index.types";

type CommentCardProps = CommentProps &
  Pick<StyledAvatarProps, "src"> & {
    userId: string | undefined;
    userName: string | undefined;
  };

export type CommentCardType = (props: CommentCardProps) => JSX.Element;
