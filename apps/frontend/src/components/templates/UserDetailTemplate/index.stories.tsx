import { graphql } from "msw";
import { follower, following, user, userPosts } from "../../../lib/faker";
import { LayoutTemplate } from "../LayoutTemplate";
import { UserDetailTemplate } from ".";
import type { FollowersQuery, FollowingQuery, UserPostsQuery } from "../../../generated";
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
                  posts: userPosts
                }
              })
            )
          // eslint-disable-next-line function-paren-newline
        ),
        graphql.query<FollowingQuery>(
          "Following",
          (_req, res, ctx) =>
            res(
              ctx.data({
                following
              })
            )
          // eslint-disable-next-line function-paren-newline
        ),
        graphql.query<FollowersQuery>(
          "Followers",
          (_req, res, ctx) =>
            res(
              ctx.data({
                follower
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
    user
  }
};
