import { UserCard } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: UserCard,
  title: "molecules/User Card"
} as ComponentMeta<typeof UserCard>;

export const userCard: ComponentStoryObj<typeof UserCard> = {
  args: {
    size: 50,
    src: "https://picsum.photos/id/200/1000/1000",
    userId: "user_id",
    userName: "User Name",
    width: "300px"
  }
};
