import { Header } from "../../organisms/Header";
import type { LayoutProps } from "./index.types";

export const Layout = ({
  children,
  ...headerProps
}: LayoutProps): JSX.Element => (
  <>
    <header>
      <Header {...headerProps} />
    </header>
    <main>{children}</main>
  </>
);
