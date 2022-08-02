import { graphql } from "msw";
import { generateAllPostsData, generateAllUsersData, generateCurrentUserData } from "../../../libs/faker";
import { LayoutTemplate } from "../LayoutTemplate";
import { HomeTemplate } from ".";
import type { PostsQuery, UsersQuery, CurrentUserQuery } from "../../../generated";
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
                posts: generateAllPostsData
              })
            )
          // eslint-disable-next-line function-paren-newline
        ),
        graphql.query<UsersQuery>(
          "Users",
          (_req, res, ctx) =>
            res(
              ctx.data({
                users: generateAllUsersData
              })
            )
          // eslint-disable-next-line function-paren-newline
        ),
        graphql.query<CurrentUserQuery>(
          "CurrentUser",
          (_req, res, ctx) =>
            res(
              ctx.data({
                currentUser: generateCurrentUserData
              })
            )
          // eslint-disable-next-line function-paren-newline
        )
      ]
    }
  },
  title: "templates/Home Template"
} as ComponentMeta<typeof HomeTemplate>;

export const homeTemplate: ComponentStory<typeof HomeTemplate> = () => (
  <LayoutTemplate>
    <HomeTemplate />
  </LayoutTemplate>
);
