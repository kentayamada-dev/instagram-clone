import { CommentCard } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: CommentCard,
  title: "molecules/Comment Card"
} as ComponentMeta<typeof CommentCard>;

export const commentCard: ComponentStoryObj<typeof CommentCard> = {
  args: {
    comment: "this is comment",
    src: "https://picsum.photos/id/200/1000/1000",
    userId: "user_id",
    userName: "User Name"
  }
};
