import Head from "next/head";
import { Footer } from "../Footer";
import { Header } from "../Header";
import type { LayoutType } from "./index.types";

export const Layout: LayoutType = ({ children, title = "Instagram Clone" }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <header
      style={{
        height: 60
      }}
    >
      <Header />
    </header>
    <main
      style={{
        display: "grid",
        minHeight: "calc(100% - 120px)"
      }}
    >
      {children}
    </main>
    <footer
      style={{
        height: 60
      }}
    >
      <Footer />
    </footer>
  </>
);
