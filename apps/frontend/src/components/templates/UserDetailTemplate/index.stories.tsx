import { graphql } from "msw";
import { generateUserData, generateUserPostsData } from "../../../libs/faker";
import { LayoutTemplate } from "../LayoutTemplate";
import { UserDetailTemplate } from ".";
import type { UserPostsQuery } from "../../../generated";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  component: UserDetailTemplate,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: [
        graphql.query<UserPostsQuery>(
          "UserPosts",
          (_req, res, ctx) =>
            res(
              ctx.data({
                user: {
                  posts: generateUserPostsData
                }
              })
            )
          // eslint-disable-next-line function-paren-newline
        )
      ]
    },
    nextRouter: {
      query: {
        userId: "userId"
      }
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
