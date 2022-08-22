import type { UseHeaderReturnType } from "../../../hooks/useHeader/type";
import type { UsePostReturnType } from "../../../hooks/usePost/type";

type PostModalProps = Pick<UseHeaderReturnType, "handleClosePostModal" | "isPostModalOpen"> &
  UsePostReturnType & {
    currentUserAvatarUrl: string | undefined;
    currentUserName: string | undefined;
  };

export type PostModalType = (props: PostModalProps) => JSX.Element;
