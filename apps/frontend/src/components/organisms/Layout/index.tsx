import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { Footer } from "../Footer";
import { Header } from "../Header";
import type { LayoutType } from "./index.types";

export const Layout: LayoutType = ({ children, title }) => (
  <Box>
    <Head>
      <title>{title}</title>
    </Head>
    <header>
      <Header />
    </header>
    <main>{children}</main>
    <footer>
      <Footer />
    </footer>
  </Box>
);
