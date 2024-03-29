import Head from "next/head";
import { Footer } from "../../organisms/Footer";
import { Header } from "../../organisms/Header";
import type { LayoutTemplateType } from "./index.types";

export const LayoutTemplate: LayoutTemplateType = ({ children, title = "Instagram Clone" }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <header
      style={{
        minHeight: "60px"
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
        minHeight: "60px"
      }}
    >
      <Footer />
    </footer>
  </>
);
