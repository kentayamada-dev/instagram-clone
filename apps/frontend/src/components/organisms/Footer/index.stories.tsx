import { Footer } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: Footer,
  decorators: [
    (Story): JSX.Element => (
      <div
        style={{
          height: 60,
          width: 500
        }}
      >
        {Story()}
      </div>
    )
  ]
} as ComponentMeta<typeof Footer>;

export const footer: ComponentStoryObj<typeof Footer> = {};
