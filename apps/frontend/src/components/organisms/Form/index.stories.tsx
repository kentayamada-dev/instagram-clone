import { Form } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: Form
} as ComponentMeta<typeof Form>;

export const form: ComponentStoryObj<typeof Form> = {
  args: {
    isSignup: true
  }
};
