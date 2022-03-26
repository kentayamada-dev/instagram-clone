import { header } from "../../organisms/Header/index.stories";
import { Layout } from "../../organisms/Layout";
import { LandingPage } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: Layout,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  subcomponents: { LandingPage },
  title: "templates/Landing Page"
} as ComponentMeta<typeof LandingPage>;

export const landingPage: ComponentStoryObj<typeof Layout> = {
  args: {
    ...header.args,
    children: <LandingPage />
  }
};
