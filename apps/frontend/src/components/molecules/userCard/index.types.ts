import type { UseFollowReturnType } from "../../../hooks/useFollow/type";
import type { NeverType } from "../../../types";
import type { StyledAvatarPropsType } from "../../atoms/StyledAvatar/index.types";

type UserCardBasePropsType = Partial<
  Pick<StyledAvatarPropsType, "src"> & {
    isLink: boolean;
    shouldUserNameHidden: boolean;
    userId: string | undefined;
    userName: string | undefined;
  }
> &
  Pick<StyledAvatarPropsType, "size">;

type FollowPropsType = UseFollowReturnType;

type UserCardDefaultPropsType = NeverType<FollowPropsType> & UserCardBasePropsType;

export type UserCardFollowPropsType = FollowPropsType & UserCardBasePropsType;

export type UserCardPropsType = UserCardDefaultPropsType | UserCardFollowPropsType;

export type UserCardType = (props: UserCardPropsType) => JSX.Element;
