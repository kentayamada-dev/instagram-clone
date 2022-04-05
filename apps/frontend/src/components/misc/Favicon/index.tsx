import type { FaviconType } from "./index.types";

export const Favicon: FaviconType = () => (
  <>
    <link
      href="/favicon/apple-touch-icon.png"
      rel="apple-touch-icon"
      sizes="180x180"
    />
    <link
      href="/favicon/favicon-32x32.png"
      rel="icon"
      sizes="32x32"
      type="image/png"
    />
    <link
      href="/favicon/favicon-16x16.png"
      rel="icon"
      sizes="16x16"
      type="image/png"
    />
    <link href="/favicon/site.webmanifest" rel="manifest" />
    <link
      color="#5bbad5"
      href="/favicon/safari-pinned-tab.svg"
      rel="mask-icon"
    />
    <meta content="Instagram Clone" name="apple-mobile-web-app-title" />
    <meta content="Instagram Clone" name="application-name" />
    <meta content="#da532c" name="msapplication-TileColor" />
    <meta content="#ffffff" name="theme-color" />
  </>
);
