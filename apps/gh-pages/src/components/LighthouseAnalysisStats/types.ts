import type { ChartData, ChartOptions } from "chart.js";
import type { ComponentProps } from "react";
import type { getElementAtEvent } from "react-chartjs-2";

export type LighthouseAnalysisStatsProps = {
  data: ChartData<"bar">;
  handleSelectChange: ComponentProps<"select">["onChange"];
  openUrl: (element: ReturnType<typeof getElementAtEvent>) => void;
  options: ChartOptions<"bar">;
  selectOptions: string[];
  title: string;
};

export type LighthouseAnalysisStatsType = (props: LighthouseAnalysisStatsProps) => JSX.Element;
