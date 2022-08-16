import type { Flex } from "@chakra-ui/react";

type StatsProps = {
  followersNumber: number | null;
  followingNumber: number | null;
  justifyContent?: React.ComponentProps<typeof Flex>["justifyContent"];
  postsNumber: number | null;
  userId: string | undefined;
  width?: React.ComponentProps<typeof Flex>["width"];
};

export type StatsType = (props: StatsProps) => JSX.Element;
