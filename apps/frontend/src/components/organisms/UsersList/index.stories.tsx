import { faker } from "@faker-js/faker";
import { UsersList } from ".";
import type { GetAllUsersModel } from "../../../types/generated/types";
import type { UsersListProps } from "./index.types";
import type { ComponentStoryObj, ComponentMeta } from "@storybook/react";

export default {
  component: UsersList,
  title: "organisms/Users List"
} as ComponentMeta<typeof UsersList>;

const user = (index: number): GetAllUsersModel => ({
  id: `userId_${index}`,
  imageUrl: "/static/landingPage/slide/1.png",
  name: faker.name.firstName()
});

const usersEdge: UsersListProps["usersEdge"] = new Array(5).fill(null).map((_, index) => ({ node: user(index) }));

export const usersList: ComponentStoryObj<typeof UsersList> = {
  args: {
    usersEdge
  }
};
