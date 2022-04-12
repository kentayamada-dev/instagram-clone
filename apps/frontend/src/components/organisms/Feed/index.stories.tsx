import { faker } from "@faker-js/faker";
import { Feed } from ".";
import type {
  GetAllPostsModel,
  GetAllPostsQuery,
  GetAllUsersModel,
  GetAllUsersQuery
} from "../../../types/generated/types";
import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
  component: Feed,
  title: "organisms/Feed"
} as ComponentMeta<typeof Feed>;

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

const postEdges: GetAllPostsQuery["getAllPosts"]["edges"] = new Array(5)
  .fill(null)
  .map((_, index) => ({ node: post(index) }));

const user = (index: number): GetAllUsersModel => ({
  id: `userId_${index}`,
  imageUrl: "/static/landingPage/slide/2.png",
  name: faker.name.firstName()
});

const userEdges: GetAllUsersQuery["getAllUsers"]["edges"] = new Array(5)
  .fill(null)
  .map((_, index) => ({ node: user(index) }));

export const feed: ComponentStoryObj<typeof Feed> = {
  args: {
    currentUserData: {
      getCurrentUser: {
        id: "currentUserId",
        imageUrl: "/static/landingPage/slide/3.png",
        name: "currentUserName"
      }
    },
    postsData: {
      getAllPosts: {
        edges: postEdges,
        pageInfo: {
          endCursor: "endCursor",
          hasNextPage: true
        }
      }
    },
    usersData: {
      getAllUsers: {
        edges: userEdges,
        pageInfo: {
          endCursor: "endCursor",
          hasNextPage: true
        }
      }
    }
  }
};
