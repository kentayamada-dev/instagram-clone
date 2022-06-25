import { Header } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: Header,
  decorators: [
    (Story): JSX.Element => (
      <div
        style={{
          height: 60
        }}
      >
        {Story()}
      </div>
    )
  ]
} as ComponentMeta<typeof Header>;

export const header: ComponentStoryObj<typeof Header> = {
  parameters: {
    layout: "fullscreen"
  }
};
