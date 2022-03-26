import { Center } from "@chakra-ui/react";
import { LoginForm } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: LoginForm,
  decorators: [(Story): JSX.Element => <Center h="100vh">{Story()}</Center>],
  title: "organisms/Login Form"
} as ComponentMeta<typeof LoginForm>;

export const loginForm: ComponentStoryObj<typeof LoginForm> = {};
