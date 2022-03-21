import type { HeaderProps } from "../../organisms/Header/index.types";
import type React from "react";

export type LayoutProps = HeaderProps & {
  children: React.ReactNode;
};
