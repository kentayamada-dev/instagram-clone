import type { UseHeaderReturnType } from "../../../hooks/useHeader/type";

type HeaderDrawerPropsType = Pick<UseHeaderReturnType, "handleCloseDrawer" | "isDrawerOpen"> & {
  isAuthenticated: boolean;
};

export type HeaderDrawerType = (props: HeaderDrawerPropsType) => JSX.Element;
