import { Center } from "@chakra-ui/react";
import { Form } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: Form,
  decorators: [(Story): JSX.Element => <Center h="100vh">{Story()}</Center>]
} as ComponentMeta<typeof Form>;

export const form: ComponentStoryObj<typeof Form> = {};
