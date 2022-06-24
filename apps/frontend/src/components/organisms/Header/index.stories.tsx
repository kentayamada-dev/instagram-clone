import { Header } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: Header
} as ComponentMeta<typeof Header>;

export const header: ComponentStoryObj<typeof Header> = {
  parameters: {
    layout: "fullscreen"
  }
};
