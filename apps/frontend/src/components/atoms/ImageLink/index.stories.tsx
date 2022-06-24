import { ImageLink } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: ImageLink,
  title: "atoms/Image Link"
} as ComponentMeta<typeof ImageLink>;

export const imageLink: ComponentStoryObj<typeof ImageLink> = {
  args: {
    alt: "alt",
    height: 35,
    href: "href",
    src: "/static/instagram/text.svg",
    width: 100
  }
};
