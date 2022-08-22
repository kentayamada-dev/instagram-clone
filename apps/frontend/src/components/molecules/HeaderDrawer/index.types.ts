import type { UseHeaderReturnType } from "../../../hooks/useHeader/type";

type HeaderDrawerProps = Pick<UseHeaderReturnType, "handleCloseDrawer" | "isDrawerOpen"> & {
  isAuthenticated: boolean;
};

export type HeaderDrawerType = (props: HeaderDrawerProps) => JSX.Element;
