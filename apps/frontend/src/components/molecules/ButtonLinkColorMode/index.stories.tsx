import { Center } from "@chakra-ui/react";
import { imageColorMode } from "../../atoms/ImageColorMode/index.stories";
import { ButtonLinkColorMode } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: ButtonLinkColorMode,
  decorators: [(Story): JSX.Element => <Center h="100vh">{Story()}</Center>],
  title: "molecules/Button Link Color Mode"
} as ComponentMeta<typeof ButtonLinkColorMode>;

export const buttonLinkColorMode: ComponentStoryObj<
  typeof ButtonLinkColorMode
> = {
  args: {
    ...imageColorMode.args,
    href: "href"
  }
};
