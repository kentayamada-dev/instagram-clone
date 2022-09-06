import { postNodes } from "../../../lib/faker";
import { Feed } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: Feed,
  decorators: [
    (Story): JSX.Element => (
      <div
        style={{
          width: 500
        }}
      >
        {Story()}
      </div>
    )
  ]
} as ComponentMeta<typeof Feed>;

export const feed: ComponentStoryObj<typeof Feed> = {
  args: {
    postNodes
  }
};
