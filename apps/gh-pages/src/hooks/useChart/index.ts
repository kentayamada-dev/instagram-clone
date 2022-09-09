import { useRef, useState, useEffect } from "react";
import { getElementAtEvent } from "react-chartjs-2";
import type { ChangeRouteHandlerType, UseChartReturnType, UseChartType } from "./type";
import type { Chart } from "chart.js";

export const useChart: UseChartType = ({ actionUrls }) => {
  const chartRef = useRef<Chart>(null);
  const [isInteractiveMode, setIsInteractiveMode] = useState(false);

  const changeRouteHandler: ChangeRouteHandlerType = (element) => {
    if (!element.length) {
      return;
    }
    const index = element[0]?.index ?? 0;
    window.open(actionUrls[index], "_blank");
  };

  const handleChartChange: UseChartReturnType["handleChartChange"] = (event) => {
    const { current: chart } = chartRef;
    if (!chart) {
      return;
    }
    changeRouteHandler(getElementAtEvent(chart, event));
  };

  const handleInputChange: UseChartReturnType["handleInputChange"] = () => {
    const { current: chart } = chartRef;
    if (
      !chart ||
      !chart.options.plugins?.zoom?.zoom?.wheel ||
      !chart.options.plugins.zoom.pan ||
      !chart.options.plugins.zoom.zoom.pinch
    ) {
      return;
    }
    setIsInteractiveMode((prev) => !prev);
    if (isInteractiveMode) {
      chart.resetZoom();
    }
    /* eslint-disable @typescript-eslint/strict-boolean-expressions */
    chart.options.plugins.zoom.zoom.wheel.enabled = !chart.options.plugins.zoom.zoom.wheel.enabled;
    chart.options.plugins.zoom.pan.enabled = !chart.options.plugins.zoom.pan.enabled;
    chart.options.plugins.zoom.zoom.pinch.enabled = !chart.options.plugins.zoom.zoom.pinch.enabled;
    /* eslint-enable @typescript-eslint/strict-boolean-expressions */
    chart.update();
  };

  useEffect(() => {
    const { current: chart } = chartRef;
    if (
      !chart ||
      !chart.options.plugins?.zoom?.zoom?.wheel ||
      !chart.options.plugins.zoom.pan ||
      !chart.options.plugins.zoom.zoom.pinch
    ) {
      return;
    }
    chart.options.plugins.zoom.zoom.wheel.enabled = false;
    chart.options.plugins.zoom.pan.enabled = false;
    chart.options.plugins.zoom.zoom.pinch.enabled = false;
    chart.update();
  }, []);

  return {
    chartRef,
    handleChartChange,
    handleInputChange,
    isInteractiveMode
  };
};
