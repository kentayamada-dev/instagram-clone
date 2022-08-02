import { graphql } from "msw";
import { generateUserData } from "../../../libs/faker";
import { LayoutTemplate } from "../LayoutTemplate";
import { UserDetailTemplate } from ".";
import type { UserQuery } from "../../../generated";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  component: UserDetailTemplate,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: [
        graphql.query<UserQuery>(
          "GetUser",
          (_req, res, ctx) =>
            res(
              ctx.data({
                user: generateUserData
              })
            )
          // eslint-disable-next-line function-paren-newline
        )
      ]
    }
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
