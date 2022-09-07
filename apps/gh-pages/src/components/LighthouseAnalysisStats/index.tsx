import { useRef, useState, useEffect } from "react";
import { getElementAtEvent, Bar } from "react-chartjs-2";
import type { LighthouseAnalysisStatsType } from "./types";
import type { Chart } from "chart.js";
import type { ComponentProps } from "react";

export const LighthouseAnalysisStats: LighthouseAnalysisStatsType = ({
  title,
  openUrl,
  handleSelectChange,
  options,
  data,
  selectOptions
}) => {
  const chartRef = useRef<Chart>(null);
  const [isInteractiveMode, setIsInteractiveMode] = useState(false);

  const handleBarChange: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
    const { current: chart } = chartRef;
    if (!chart) {
      return;
    }
    openUrl(getElementAtEvent(chart, event));
  };

  const handleInputChange: ComponentProps<"input">["onChange"] = () => {
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

  return (
    <>
      <p className="text-lg font-bold my-0 ml-5">{title}</p>
      <div className="flex gap-3 sm:gap-5 ml-5">
        <label className="label cursor-pointer flex flex-col p-0">
          <span className="label-text">Toggle interactive mode</span>
          <input
            checked={isInteractiveMode}
            className="toggle toggle-primary mb-3"
            onChange={handleInputChange}
            type="checkbox"
          />
        </label>
        <label className="label p-0 cursor-pointer flex flex-col items-start">
          <span className="label-text">Select Path</span>
          <select className="select select-primary" defaultValue="" onChange={handleSelectChange}>
            {selectOptions.map((address) => (
              <option key={address} value={address}>
                {address}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="overflow-x-auto">
        <div className="relative min-w-[45rem]">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          <Bar data={data} onClick={handleBarChange} options={options} ref={chartRef} />
        </div>
      </div>
    </>
  );
};
