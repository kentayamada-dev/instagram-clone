import { Bar } from "react-chartjs-2";
import { useChart } from "../../hooks/useChart";
import type { LighthouseAnalysisStatsType } from "./types";

export const LighthouseAnalysisStats: LighthouseAnalysisStatsType = ({
  title,
  handleSelectChange,
  options,
  data,
  actionUrls,
  selectOptions
}) => {
  const { isInteractiveMode, handleChartChange, handleInputChange, chartRef } = useChart({ actionUrls });

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
          <Bar data={data} onClick={handleChartChange} options={options} ref={chartRef} />
        </div>
      </div>
    </>
  );
};
