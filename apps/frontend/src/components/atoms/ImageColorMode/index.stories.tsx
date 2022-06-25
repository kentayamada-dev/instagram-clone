import { ImageColorMode } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

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
    height: 70,
    lightImg: {
      alt: "lightImg alt",
      src: "/static/vercel/logo_light.png"
    },
    width: 200
  }
};
