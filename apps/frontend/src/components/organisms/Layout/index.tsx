import { Footer } from "../../molecules/Footer";
import { Header } from "../../molecules/Header";
import type { LayoutProps } from "./index.types";

export const Layout = ({ children }: LayoutProps): JSX.Element => (
  <>
    <header>
      <Header />
    </header>
    <main>{children}</main>
    <footer>
      <Footer />
    </footer>
  </>
);
