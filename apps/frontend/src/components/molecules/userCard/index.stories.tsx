import { UserCard } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: UserCard,
  title: "molecules/User Card"
} as ComponentMeta<typeof UserCard>;

export const userCard: ComponentStoryObj<typeof UserCard> = {
  args: {
    size: 50,
    src: "/static/landingPage/slide/3.png",
    userId: "userId",
    userName: "userName"
  }
};
