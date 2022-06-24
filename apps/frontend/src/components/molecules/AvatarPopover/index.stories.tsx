import { styledAvatar } from "../../atoms/StyledAvatar/index.stories";
import { AvatarPopover } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: AvatarPopover,
  title: "molecules/Avatar Popover"
} as ComponentMeta<typeof AvatarPopover>;

export const avatarPopover: ComponentStoryObj<typeof AvatarPopover> = {
  args: {
    ...styledAvatar.args
  }
};
