import { faker } from "@faker-js/faker";
import { PostDetailTemplate } from ".";
import type { PostDetailTemplateProps } from "./index.types";
import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
  component: PostDetailTemplate,
  title: "templates/Post Detail Template"
} as ComponentMeta<typeof PostDetailTemplate>;

const data: PostDetailTemplateProps["data"] = {
  caption: "caption",
  createdAt: faker.date.past(),
  id: "postId",
  imageUrl: "/static/landingPage/slide/1.png",
  user: {
    id: "userId",
    imageUrl: "/static/landingPage/slide/2.png",
    name: "userName"
  }
};

export const postDetailTemplate: ComponentStoryObj<typeof PostDetailTemplate> = {
  args: {
    data
  }
};
