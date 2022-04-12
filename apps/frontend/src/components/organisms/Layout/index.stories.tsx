import { Layout } from ".";
import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
  component: Layout
} as ComponentMeta<typeof Layout>;

export const layout: ComponentStoryObj<typeof Layout> = {
  args: {
    title: "title"
  }
};
