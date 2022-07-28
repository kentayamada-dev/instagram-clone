import { PostModal } from ".";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: PostModal,
  title: "molecules/Post Modal"
} as ComponentMeta<typeof PostModal>;

export const postModal: ComponentStoryObj<typeof PostModal> = {
  args: {
    currentUserAvatarUrl: "https://picsum.photos/id/200/1000/1000",
    currentUserName: "Current User Name",
    imagePreviewSrc: "https://picsum.photos/id/400/1000/1000",
    isLoading: false,
    isOpen: true
  }
};
