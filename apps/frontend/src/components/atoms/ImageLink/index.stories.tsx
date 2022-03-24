import { Center } from "@chakra-ui/react";
import { ImageLink } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: ImageLink,
  decorators: [(Story): JSX.Element => <Center h="100vh">{Story()}</Center>],
  title: "atoms/Image Link"
} as ComponentMeta<typeof ImageLink>;

export const imageLink: ComponentStoryObj<typeof ImageLink> = {
  args: {
    alt: "alt",
    height: 35,
    href: "href",
    src: "/static/instagram/text.svg",
    width: 100
  }
};
