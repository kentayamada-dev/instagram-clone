import { imageColorMode } from "../../atoms/ImageColorMode/index.stories";
import { ImageLinkColorMode } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: ImageLinkColorMode,
  title: "molecules/Image Link Color Mode"
} as ComponentMeta<typeof ImageLinkColorMode>;

export const imageLinkColorMode: ComponentStoryObj<typeof ImageLinkColorMode> = {
  args: {
    ...imageColorMode.args,
    href: "href"
  }
};
