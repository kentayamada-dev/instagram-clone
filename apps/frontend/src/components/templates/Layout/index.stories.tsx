import { header } from "../../organisms/Header/index.stories";
import { Layout } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: Layout
} as ComponentMeta<typeof Layout>;

export const layout: ComponentStoryObj<typeof Layout> = {
  args: { ...header.args }
};
