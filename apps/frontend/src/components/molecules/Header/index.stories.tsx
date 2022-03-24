import { Center } from "@chakra-ui/react";
import { Header } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: Header,
  decorators: [(Story): JSX.Element => <Center h="100vh">{Story()}</Center>]
} as ComponentMeta<typeof Header>;

export const header: ComponentStoryObj<typeof Header> = {};
