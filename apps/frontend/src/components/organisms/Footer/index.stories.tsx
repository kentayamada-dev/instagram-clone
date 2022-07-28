import { Footer } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: Footer,
  decorators: [
    (Story): JSX.Element => (
      <div
        style={{
          alignItems: "flex-end",
          display: "flex",
          minHeight: "100vh"
        }}
      >
        {Story()}
      </div>
    )
  ],
  parameters: {
    layout: "fullscreen"
  }
} as ComponentMeta<typeof Footer>;

export const footer: ComponentStoryObj<typeof Footer> = {};
