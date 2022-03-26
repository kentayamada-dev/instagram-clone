import { Center } from "@chakra-ui/react";
import { ImageColorMode } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: ImageColorMode,
  decorators: [(Story): JSX.Element => <Center h="100vh">{Story()}</Center>],
  title: "atoms/Image Color Mode"
} as ComponentMeta<typeof ImageColorMode>;

export const imageColorMode: ComponentStoryObj<typeof ImageColorMode> = {
  args: {
    darkImg: {
      alt: "darkImg alt",
      src: "/static/vercel/logo_dark.png"
    },
    height: 35,
    lightImg: {
      alt: "lightImg alt",
      src: "/static/vercel/logo_light.png"
    },
    width: 100
  }
};
