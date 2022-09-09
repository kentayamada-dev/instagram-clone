import type { ChartData, ChartOptions } from "chart.js";
import type { ComponentProps } from "react";

export type LighthouseAnalysisStatsProps = {
  actionUrls: string[];
  data: ChartData<"bar">;
  handleSelectChange: ComponentProps<"select">["onChange"];
  options: ChartOptions<"bar">;
  selectOptions: string[];
  title: string;
};

export type LighthouseAnalysisStatsType = (props: LighthouseAnalysisStatsProps) => JSX.Element;
