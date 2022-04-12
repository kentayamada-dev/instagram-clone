import { faker } from "@faker-js/faker";
import { UserDetailTemplate } from ".";
import type {
  GetPostModel,
  GetUserQuery
} from "../../../types/generated/types";
import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
  component: UserDetailTemplate,
  title: "templates/User Detail Template"
} as ComponentMeta<typeof UserDetailTemplate>;

const post = (index: number): GetPostModel => ({
  caption: faker.lorem.text(),
  createdAt: faker.date.past(),
  id: `postId_${index}`,
  imageUrl: "/static/landingPage/slide/1.png"
});

const posts: GetUserQuery["getUser"]["posts"] = new Array(5)
  .fill(null)
  .map((_, index) => post(index));

export const userDetailTemplate: ComponentStoryObj<typeof UserDetailTemplate> =
  {
    args: {
      data: {
        id: "userId",
        imageUrl: "/static/landingPage/slide/2.png",
        name: "userName",
        posts
      }
    }
  };
