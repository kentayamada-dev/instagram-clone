import type { FlexProps } from "@chakra-ui/react";

type StatsProps = Partial<Pick<FlexProps, "justifyContent" | "width">> & {
  followersNumber: number | null;
  followingNumber: number | null;
  postsNumber: number | null;
  userId: string | undefined;
};

export type StatsType = (props: StatsProps) => JSX.Element;
