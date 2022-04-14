import { PostModal } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: PostModal,
  title: "molecules/Post Modal"
} as ComponentMeta<typeof PostModal>;

export const postModal: ComponentStoryObj<typeof PostModal> = {
  args: {
    currentUserAvatarUrl: "/static/landingPage/slide/3.png",
    currentUserName: "Current User Name",
    imagePreviewSrc: "/static/landingPage/slide/4.png",
    isLoading: false,
    isOpen: true
  }
};
