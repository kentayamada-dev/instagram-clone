import { post } from "../../../libs/faker";
import { LayoutTemplate } from "../LayoutTemplate";
import { PostDetailTemplate } from ".";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  component: PostDetailTemplate,
  parameters: {
    layout: "fullscreen"
  },
  title: "templates/Post Detail Template"
} as ComponentMeta<typeof PostDetailTemplate>;

export const postDetailTemplate: ComponentStory<typeof PostDetailTemplate> = (args) => (
  <LayoutTemplate>
    <PostDetailTemplate {...args} />
  </LayoutTemplate>
);

postDetailTemplate.args = {
  data: post(1)
};
