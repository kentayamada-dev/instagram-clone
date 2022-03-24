import { Center } from "@chakra-ui/react";
import { ImageLinkColorMode } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: ImageLinkColorMode,
  decorators: [(Story): JSX.Element => <Center h="100vh">{Story()}</Center>],
  title: "atoms/Image Link Color Mode"
} as ComponentMeta<typeof ImageLinkColorMode>;

export const imageLinkColorMode: ComponentStoryObj<typeof ImageLinkColorMode> =
  {
    args: {
      darkImg: {
        alt: "darkImg alt",
        src: "/static/vercel/logo_dark.png"
      },
      height: 35,
      href: "href",
      lightImg: {
        alt: "lightImg alt",
        src: "/static/vercel/logo_light.png"
      },
      width: 100
    }
  };
