import { graphql } from "msw";
import { posts, users, currentUser, user } from "../../../lib/faker";
import { LayoutTemplate } from "../LayoutTemplate";
import { HomeTemplate } from ".";
import type { PostsQuery, UsersQuery, UserQuery } from "../../../generated";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  component: HomeTemplate,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: [
        graphql.query<PostsQuery>(
          "Posts",
          (_req, res, ctx) =>
            res(
              ctx.data({
                posts
              })
            )
          // eslint-disable-next-line function-paren-newline
        ),
        graphql.query<UsersQuery>(
          "Users",
          (_req, res, ctx) =>
            res(
              ctx.data({
                users
              })
            )
          // eslint-disable-next-line function-paren-newline
        ),
        graphql.query<UserQuery>(
          "User",
          (_req, res, ctx) =>
            res(
              ctx.data({
                user
              })
            )
          // eslint-disable-next-line function-paren-newline
        )
      ]
    }
  },
  title: "templates/Home Template"
} as ComponentMeta<typeof HomeTemplate>;

export const homeTemplate: ComponentStory<typeof HomeTemplate> = (args) => (
  <LayoutTemplate>
    <HomeTemplate {...args} />
  </LayoutTemplate>
);

homeTemplate.args = {
  currentUser
};
