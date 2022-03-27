import { MemorizedHeaderDrawer } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: MemorizedHeaderDrawer
} as ComponentMeta<typeof MemorizedHeaderDrawer>;

export const headerDrawer: ComponentStoryObj<typeof MemorizedHeaderDrawer> = {
  args: {
    isOpen: false
  }
};
