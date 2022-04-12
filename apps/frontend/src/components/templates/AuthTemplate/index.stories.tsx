import { AuthTemplate } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: AuthTemplate,
  title: "templates/Auth Template"
} as ComponentMeta<typeof AuthTemplate>;

export const authTemplate: ComponentStoryObj<typeof AuthTemplate> = {
  args: {
    isSignup: true
  }
};
