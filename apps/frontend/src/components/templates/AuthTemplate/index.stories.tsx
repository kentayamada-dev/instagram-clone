import { LayoutTemplate } from "../LayoutTemplate";
import { AuthTemplate } from ".";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  component: AuthTemplate,
  parameters: {
    layout: "fullscreen"
  },
  title: "templates/Auth Template"
} as ComponentMeta<typeof AuthTemplate>;

export const authTemplate: ComponentStory<typeof AuthTemplate> = (args) => (
  <LayoutTemplate>
    <AuthTemplate {...args} />
  </LayoutTemplate>
);

authTemplate.args = {
  isSignup: true
};
