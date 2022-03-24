import { Center } from "@chakra-ui/react";
import { SearchBox } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: SearchBox,
  decorators: [(Story): JSX.Element => <Center h="100vh">{Story()}</Center>],
  title: "atoms/Search Box"
} as ComponentMeta<typeof SearchBox>;

export const searchBox: ComponentStoryObj<typeof SearchBox> = {};
