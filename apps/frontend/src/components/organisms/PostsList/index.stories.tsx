import { userPostNodes } from "../../../libs/faker";
import { PostsList } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: PostsList,
  decorators: [
    (Story): JSX.Element => (
      <div
        style={{
          width: "700px"
        }}
      >
        {Story()}
      </div>
    )
  ],
  parameters: {
    layout: "centered"
  },
  title: "organisms/Posts List"
} as ComponentMeta<typeof PostsList>;

export const postsList: ComponentStoryObj<typeof PostsList> = {
  args: {
    posts: userPostNodes,
    userId: "userId"
  }
};
