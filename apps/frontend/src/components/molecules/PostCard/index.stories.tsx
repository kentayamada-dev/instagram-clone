import { userCard } from "../userCard/index.stories";
import { PostCard } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: PostCard,
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
  ],
  title: "molecules/Post Card"
} as ComponentMeta<typeof PostCard>;

export const postCard: ComponentStoryObj<typeof PostCard> = {
  args: {
    ...userCard.args,
    caption: "caption",
    createdAt: "2022-08-12 16:43:24.512",
    imageUrl: "https://picsum.photos/id/100/1000/1000",
    shouldUserNameHidden: true
  }
};
