import { LayoutTemplate } from ".";
import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
  component: LayoutTemplate,
  decorators: [
    (Story): JSX.Element => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "100vh"
        }}
      >
        {Story()}
      </div>
    )
  ],
  parameters: {
    layout: "fullscreen"
  },
  title: "templates/Layout Template"
} as ComponentMeta<typeof LayoutTemplate>;

export const layoutTemplate: ComponentStoryObj<typeof LayoutTemplate> = {
  args: {
    title: "title"
  }
};
