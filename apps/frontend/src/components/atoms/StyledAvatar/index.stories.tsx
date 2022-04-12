import { Center } from "@chakra-ui/react";
import { StyledAvatar } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: StyledAvatar,
  decorators: [(Story): JSX.Element => <Center h="100vh">{Story()}</Center>],
  title: "atoms/Styled Avatar"
} as ComponentMeta<typeof StyledAvatar>;

export const styledAvatar: ComponentStoryObj<typeof StyledAvatar> = {
  args: {
    alt: "Image Alt",
    size: 50,
    src: "/static/landingPage/slide/3.png"
  }
};
