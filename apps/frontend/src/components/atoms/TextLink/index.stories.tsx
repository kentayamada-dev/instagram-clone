import { TextLink } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: TextLink,
  title: "atoms/Text Link"
} as ComponentMeta<typeof TextLink>;

export const textLink: ComponentStoryObj<typeof TextLink> = {
  args: {
    href: "href",
    isVisibleUnderline: true,
    text: "this is link"
  }
};
