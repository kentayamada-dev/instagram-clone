import type { UseHeaderReturnType } from "../../../hooks/useHeader/type";

/* eslint-disable @typescript-eslint/indent */

export type HeaderDrawerProps = Pick<
  UseHeaderReturnType,
  "handleCloseDrawer" | "isDrawerOpen"
> & {
  isAuthenticated: boolean;
};
/* eslint-enable @typescript-eslint/indent */

export type HeaderDrawerType = (props: HeaderDrawerProps) => JSX.Element;
