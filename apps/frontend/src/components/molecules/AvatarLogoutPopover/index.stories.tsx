import { styledAvatar } from "../../atoms/StyledAvatar/index.stories";
import { AvatarLogoutPopover } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: AvatarLogoutPopover,
  title: "molecules/Avatar Logout Popover"
} as ComponentMeta<typeof AvatarLogoutPopover>;

export const avatarLogoutPopover: ComponentStoryObj<typeof AvatarLogoutPopover> = {
  args: {
    ...styledAvatar.args
  }
};
