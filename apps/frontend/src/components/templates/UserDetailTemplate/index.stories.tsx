import { generateUserData } from "../../../libs/faker";
import { LayoutTemplate } from "../LayoutTemplate";
import { UserDetailTemplate } from ".";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  component: UserDetailTemplate,
  parameters: {
    layout: "fullscreen"
  },
  title: "templates/User Detail Template"
} as ComponentMeta<typeof UserDetailTemplate>;

export const userDetailTemplate: ComponentStory<typeof UserDetailTemplate> = (args) => (
  <LayoutTemplate>
    <UserDetailTemplate {...args} />
  </LayoutTemplate>
);

userDetailTemplate.args = {
  data: {
    user: generateUserData
  }
};
