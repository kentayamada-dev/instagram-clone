import { ImageColorMode } from ".";
import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
  component: ImageColorMode,
  title: "atoms/Image Color Mode"
} as ComponentMeta<typeof ImageColorMode>;

export const imageColorMode: ComponentStoryObj<typeof ImageColorMode> = {
  args: {
    darkImg: {
      alt: "darkImg alt",
      src: "/static/vercel/logo_dark.png"
    },
    height: 100,
    lightImg: {
      alt: "lightImg alt",
      src: "/static/vercel/logo_light.png"
    },
    width: 300
  }
};
