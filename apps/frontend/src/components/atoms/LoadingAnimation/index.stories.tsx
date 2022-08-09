import { LoadingAnimation } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: LoadingAnimation,
  title: "atoms/Loading Animation"
} as ComponentMeta<typeof LoadingAnimation>;

export const loadingAnimation: ComponentStoryObj<typeof LoadingAnimation> = {};
