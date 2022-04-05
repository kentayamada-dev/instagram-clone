import { ColorModeScript } from "@chakra-ui/react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { Favicon } from "../components/misc/Favicon";

// eslint-disable-next-line @typescript-eslint/naming-convention
class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  public override render(): JSX.Element {
    return (
      <Html>
        <Head>
          <Favicon />
        </Head>
        <body>
          <ColorModeScript initialColorMode="system" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
