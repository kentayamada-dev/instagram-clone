import { Layout } from "../../organisms/Layout";
import { AuthTemplate } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: Layout,
  subcomponents: { LandingPage: AuthTemplate },
  title: "templates/Auth Template"
} as ComponentMeta<typeof AuthTemplate>;

export const authTemplate: ComponentStoryObj<typeof Layout> = {
  args: {
    children: <AuthTemplate isSignup={false} />
  }
};
