import { faker } from "@faker-js/faker";
import { PostsList } from ".";
import type { GetAllPostsModel } from "../../../types/generated/types";
import type { PostsListProps } from "./index.types";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: PostsList,
  decorators: [
    (Story): JSX.Element => (
      <div
        style={{
          width: 500
        }}
      >
        {Story()}
      </div>
    )
  ],
  title: "organisms/Posts List"
} as ComponentMeta<typeof PostsList>;

const post = (index: number): GetAllPostsModel => ({
  caption: faker.lorem.text(),
  createdAt: faker.date.past(),
  id: `postId_${index}`,
  imageUrl: "/static/landingPage/slide/1.png",
  user: {
    id: `userId_${index}`,
    imageUrl: "/static/landingPage/slide/2.png",
    name: faker.name.firstName()
  }
});

const postsEdge: PostsListProps["postsEdge"] = new Array(5)
  .fill(null)
  .map((_, index) => ({ node: post(index) }));

export const postsList: ComponentStoryObj<typeof PostsList> = {
  args: {
    postsEdge
  }
};
