import { Layout } from ".";
import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
  component: Layout,
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
  ]
} as ComponentMeta<typeof Layout>;

export const layout: ComponentStoryObj<typeof Layout> = {
  args: {
    title: "title"
  },
  parameters: {
    layout: "fullscreen"
  }
};
