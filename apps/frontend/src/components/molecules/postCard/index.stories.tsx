import { Box, Center } from "@chakra-ui/react";
import { userCard } from "../userCard/index.stories";
import { PostCard } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: PostCard,
  decorators: [
    (Story): JSX.Element => (
      <Center>
        <Box h="500px" w="500px">
          {Story()}
        </Box>
      </Center>
    )
  ],
  title: "molecules/Post Card"
} as ComponentMeta<typeof PostCard>;

export const postCard: ComponentStoryObj<typeof PostCard> = {
  args: {
    ...userCard.args,
    caption: "caption",
    imageUrl: "/static/landingPage/slide/2.png"
  }
};
