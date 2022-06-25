import { StyledAvatar } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: StyledAvatar,
  title: "atoms/Styled Avatar"
} as ComponentMeta<typeof StyledAvatar>;

export const styledAvatar: ComponentStoryObj<typeof StyledAvatar> = {
  args: {
    alt: "Image Alt",
    size: 70,
    src: "/static/landingPage/slide/4.png"
  }
};
