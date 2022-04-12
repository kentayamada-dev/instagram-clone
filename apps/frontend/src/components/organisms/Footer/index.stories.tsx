import { Center } from "@chakra-ui/react";
import { Footer } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: Footer,
  decorators: [
    (Story): JSX.Element => (
      <Center h="100vh">
        <div
          style={{
            height: 60,
            width: "100%"
          }}
        >
          {Story()}
        </div>
      </Center>
    )
  ]
} as ComponentMeta<typeof Footer>;

export const footer: ComponentStoryObj<typeof Footer> = {};
