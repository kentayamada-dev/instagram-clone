import { Center } from "@chakra-ui/react";
import { styledAvatar } from "../../atoms/StyledAvatar/index.stories";
import { AvatarPopover } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: AvatarPopover,
  decorators: [(Story): JSX.Element => <Center h="100vh">{Story()}</Center>],
  title: "molecules/Avatar Popover"
} as ComponentMeta<typeof AvatarPopover>;

export const avatarPopover: ComponentStoryObj<typeof AvatarPopover> = {
  args: {
    ...styledAvatar.args
  }
};
