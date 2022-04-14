import { Center } from "@chakra-ui/react";
import { UserCard } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: UserCard,
  decorators: [
    (Story): JSX.Element => (
      <Center h="100%" w="100%">
        {Story()}
      </Center>
    )
  ],
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
