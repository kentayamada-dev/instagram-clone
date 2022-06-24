import { imageColorMode } from "../../atoms/ImageColorMode/index.stories";
import { ButtonLinkColorMode } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: ButtonLinkColorMode,
  title: "molecules/Button Link Color Mode"
} as ComponentMeta<typeof ButtonLinkColorMode>;

export const buttonLinkColorMode: ComponentStoryObj<
  typeof ButtonLinkColorMode
> = {
  args: {
    ...imageColorMode.args,
    href: "href"
  }
};
