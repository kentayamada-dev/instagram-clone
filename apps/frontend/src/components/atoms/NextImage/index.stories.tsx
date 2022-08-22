import { NextImage } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: NextImage,
  title: "atoms/Next Image"
} as ComponentMeta<typeof NextImage>;

export const nextImage: ComponentStoryObj<typeof NextImage> = {
  args: {
    alt: "alt",
    height: 100,
    src: "/static/instagram/text.svg",
    width: 300
  }
};
