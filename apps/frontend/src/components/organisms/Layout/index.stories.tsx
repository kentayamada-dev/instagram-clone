import { Box } from "@chakra-ui/react";
import { Layout } from ".";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  component: Layout
} as ComponentMeta<typeof Layout>;

const LayoutTemplate: ComponentStory<typeof Layout> = (args) => (
  <Layout {...args}>
    <Box minH="84vh" />
  </Layout>
);

export const layout = LayoutTemplate.bind({});
