import { ColorModeScript } from "@chakra-ui/react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { HeaderTags } from "../components/misc/HeaderTags";

// eslint-disable-next-line @typescript-eslint/naming-convention
class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  public override render(): JSX.Element {
    return (
      <Html>
        <Head>
          <HeaderTags />
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
