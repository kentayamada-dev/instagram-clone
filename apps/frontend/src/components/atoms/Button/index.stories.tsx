import { Button } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: Button
} as ComponentMeta<typeof Button>;

export const button: ComponentStoryObj<typeof Button> = {
  args: {
    isPrimary: true,
    label: "ラベル",
    size: "large"
  }
};
