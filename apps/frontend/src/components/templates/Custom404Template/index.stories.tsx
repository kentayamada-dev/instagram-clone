import { LayoutTemplate } from "../LayoutTemplate";
import { Custom404Template } from ".";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  component: Custom404Template,
  decorators: [
    (Story): JSX.Element => (
      <div
        style={{
          height: "100vh"
        }}
      >
        {Story()}
      </div>
    )
  ],
  parameters: {
    layout: "fullscreen"
  },
  title: "templates/Custom 404 Template"
} as ComponentMeta<typeof Custom404Template>;

export const custom404Template: ComponentStory<typeof Custom404Template> = () => (
  <LayoutTemplate>
    <Custom404Template />
  </LayoutTemplate>
);
