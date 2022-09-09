import { Chart, LinearScale, CategoryScale, BarElement, Legend, Tooltip } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Bar } from "react-chartjs-2";
import bundleData from "../../assets/bundle.json";
import { useChart } from "../../hooks/useChart";
import { bytesToKb } from "../../utils/bytesToKb";
import { getColor } from "../../utils/getColor";
import type { BundleAnalysisStatsType } from "./types";
import type { ChartOptions, ChartData } from "chart.js";

Chart.register(zoomPlugin, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type BundleDataKeyType = keyof typeof bundleData[0]["data"];

/* eslint-disable id-length */
const options: ChartOptions<"bar"> = {
  plugins: {
    legend: {
      position: "right"
    },
    tooltip: {
      callbacks: {
        title: (context) => `Date: ${context[0]?.label ?? ""}`
      },
      titleFont: {
        weight: "normal"
      }
    },
    zoom: {
      limits: {
        y: { max: 300, min: 0, minRange: 50 }
      },
      pan: {
        enabled: true
      },
      zoom: {
        mode: "xy",
        pinch: {
          enabled: true
        },
        wheel: {
          enabled: true
        }
      }
    }
  },
  scales: {
    x: { title: { display: true, text: "Date" } },
    y: { title: { display: true, text: "Gzip Size (KB)" } }
  }
};
/* eslint-enable id-length */

export const BundleAnalysisStats: BundleAnalysisStatsType = () => {
  const labels = bundleData.map((data) => data.date);
  const actionUrls = bundleData.map((data) => data.actionUrl);
  const latestBuild = bundleData.slice(-1)[0];
  const keys = Object.keys(latestBuild?.data ?? {});
  const datasets: ChartData<"bar">["datasets"] = [];
  const { isInteractiveMode, handleChartChange, handleInputChange, chartRef } = useChart({ actionUrls });

  bundleData.forEach(({ data }) => {
    for (const [index, key] of keys.entries()) {
      const foundData = data[key as BundleDataKeyType];
      const foundObject = datasets.find((dataset) => dataset.label === key);
      const fileSize = bytesToKb(foundData.gzip);
      if (foundObject) {
        foundObject.data = [...foundObject.data, fileSize];
      } else {
        const color = getColor(index);
        datasets.push({
          backgroundColor: color,
          borderColor: color,
          data: [fileSize],
          label: key
        });
      }
    }
  });

  const data: ChartData<"bar"> = {
    datasets,
    labels
  };

  return (
    <div>
      <label className="label cursor-pointer flex w-60 pl-5 pt-0 pb-5 gap-3">
        <input
          checked={isInteractiveMode}
          className="toggle toggle-primary"
          // eslint-disable-next-line react/jsx-handler-names
          onChange={handleInputChange}
          type="checkbox"
        />
        <span className="label-text">Toggle interactive mode</span>
      </label>
      <div className="overflow-x-auto">
        <div className="relative min-w-[50rem]">
          <Bar data={data} onClick={handleChartChange} options={options} ref={chartRef} />
        </div>
      </div>
    </div>
  );
};
