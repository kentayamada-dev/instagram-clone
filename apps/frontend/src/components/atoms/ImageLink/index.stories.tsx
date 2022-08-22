import { nextImage } from "../NextImage/index.stories";
import { ImageLink } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: ImageLink,
  title: "atoms/Image Link"
} as ComponentMeta<typeof ImageLink>;

export const imageLink: ComponentStoryObj<typeof ImageLink> = {
  args: {
    href: "href",
    isExternal: true,
    ...nextImage.args
  }
};
