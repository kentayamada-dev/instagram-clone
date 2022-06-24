import { userCard } from "../userCard/index.stories";
import { PostCard } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: PostCard,
  decorators: [
    (Story): JSX.Element => (
      <div
        style={{
          height: 300,
          width: 300
        }}
      >
        {Story()}
      </div>
    )
  ],
  title: "molecules/Post Card"
} as ComponentMeta<typeof PostCard>;

export const postCard: ComponentStoryObj<typeof PostCard> = {
  args: {
    ...userCard.args,
    caption: "caption",
    imageUrl: "/static/landingPage/slide/1.png"
  }
};
