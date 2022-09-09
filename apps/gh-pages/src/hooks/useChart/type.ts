import type { InteractionItem } from "chart.js";
import type { MouseEvent } from "react";

export type UseChartReturnType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartRef: any;
  handleChartChange: (event: MouseEvent<HTMLCanvasElement>) => void;
  handleInputChange: () => void;
  isInteractiveMode: boolean;
};

type UseChartProps = {
  actionUrls: string[];
};

export type UseChartType = (props: UseChartProps) => UseChartReturnType;

export type ChangeRouteHandlerType = (element: InteractionItem[]) => void;
