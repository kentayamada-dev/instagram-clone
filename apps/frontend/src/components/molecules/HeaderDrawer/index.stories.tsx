import { HeaderDrawer } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: HeaderDrawer,
  title: "molecules/Header Drawer"
} as ComponentMeta<typeof HeaderDrawer>;

export const headerDrawer: ComponentStoryObj<typeof HeaderDrawer> = {
  args: {
    isAuthenticated: true,
    isDrawerOpen: true
  }
};
