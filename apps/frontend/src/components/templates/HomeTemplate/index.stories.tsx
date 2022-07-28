import { graphql } from "msw";
import {
  generateAllPostsData,
  generateAllUsersData,
  generateCurrentUserData,
  generateUserData
} from "../../../libs/faker";
import { LayoutTemplate } from "../LayoutTemplate";
import { HomeTemplate } from ".";
import type { GetAllPostsQuery, GetAllUsersQuery, GetCurrentUserQuery, GetUserQuery } from "../../../generated";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  component: HomeTemplate,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: [
        graphql.query<GetAllPostsQuery>(
          "GetAllPosts",
          (_req, res, ctx) =>
            res(
              ctx.data({
                getAllPosts: generateAllPostsData
              })
            )
          // eslint-disable-next-line function-paren-newline
        ),
        graphql.query<GetAllUsersQuery>(
          "GetAllUsers",
          (_req, res, ctx) =>
            res(
              ctx.data({
                getAllUsers: generateAllUsersData
              })
            )
          // eslint-disable-next-line function-paren-newline
        ),
        graphql.query<GetCurrentUserQuery>(
          "GetCurrentUser",
          (_req, res, ctx) =>
            res(
              ctx.data({
                getCurrentUser: generateCurrentUserData
              })
            )
          // eslint-disable-next-line function-paren-newline
        ),
        graphql.query<GetUserQuery>(
          "GetUser",
          (_req, res, ctx) =>
            res(
              ctx.data({
                getUser: generateUserData
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
