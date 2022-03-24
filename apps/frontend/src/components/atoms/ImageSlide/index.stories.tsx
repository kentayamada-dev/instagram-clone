import { Center } from "@chakra-ui/react";
import { ImageSlide } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: ImageSlide,
  decorators: [(Story): JSX.Element => <Center h="100vh">{Story()}</Center>],
  title: "atoms/Image Slide"
} as ComponentMeta<typeof ImageSlide>;

export const imageSlide: ComponentStoryObj<typeof ImageSlide> = {};
