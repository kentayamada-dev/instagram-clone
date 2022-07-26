import { imageLink } from "../../atoms/ImageLink/index.stories";
import { ButtonLink } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: ButtonLink,
  title: "molecules/Button Link"
} as ComponentMeta<typeof ButtonLink>;

export const buttonLink: ComponentStoryObj<typeof ButtonLink> = {
  args: {
    ...imageLink.args,
    isExternal: true
  }
};
