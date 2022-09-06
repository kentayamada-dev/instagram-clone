import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Legend, Tooltip } from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import React from "react";
import bundleData from "../../assets/bundle.json";
import zoomPlugin from "chartjs-plugin-zoom";
import { getColor } from "../utils";

ChartJS.register(zoomPlugin, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const options = {
  scales: {
    x: { title: { display: true, text: "Date" } },
    y: { title: { display: true, text: "Gzip Size (KB)" } }
  },
  plugins: {
    zoom: {
      pan: {
        enabled: true
      },
      limits: {
        y: { min: 0, max: 300, minRange: 50 }
      },
      zoom: {
        wheel: {
          enabled: true
        },
        pinch: {
          enabled: true
        },
        mode: "xy"
      }
    },
    legend: {
      position: "right"
    }
  }
};

const bytesToKb = (value) => Math.round((value / 1024) * Math.pow(10, 2)) / Math.pow(10, 2);

export default function BundleAnalysisStats() {
  const labels = bundleData.map((data) => data.date);
  const actionUrls = bundleData.map((data) => data.actionUrl);
  const latestBuild = bundleData.slice(-1)[0];
  const keys = Object.keys(latestBuild.data);
  const datasets = [];

  bundleData.forEach(({ data }) => {
    for (const [index, key] of keys.entries()) {
      const foundData = data[key];
      const foundObject = datasets.find((dataset) => dataset.label === key);
      const fileSize = foundData ? bytesToKb(foundData.gzip) : 0;
      if (foundObject) {
        foundObject.data = [...foundObject.data, fileSize];
      } else {
        const color = getColor(index);
        datasets.push({
          label: key,
          data: [fileSize],
          borderColor: color,
          backgroundColor: color
        });
      }
    }
  });

  const data = {
    labels,
    datasets
  };
  const chartRef = React.useRef(null);
  const [isInteractiveMode, setIsInteractiveMode] = React.useState(false);

  const printElementAtEvent = (element) => {
    if (!element.length) return;
    const { index } = element[0];
    window.open(actionUrls[index], "_blank");
  };

  const onClick = (event) => {
    const { current: chart } = chartRef;
    if (!chart) {
      return;
    }
    printElementAtEvent(getElementAtEvent(chart, event));
  };

  const onClickHandler = () => {
    const { current: chart } = chartRef;
    if (!chart) {
      return;
    }
    setIsInteractiveMode((prev) => !prev);
    if (isInteractiveMode) {
      chart.resetZoom();
    }
    chart.options.plugins.zoom.zoom.wheel.enabled = !chart.options.plugins.zoom.zoom.wheel.enabled;
    chart.options.plugins.zoom.pan.enabled = !chart.options.plugins.zoom.pan.enabled;
    chart.options.plugins.zoom.zoom.pinch.enabled = !chart.options.plugins.zoom.zoom.pinch.enabled;
    chart.update();
  };

  React.useEffect(() => {
    const { current: chart } = chartRef;
    if (!chart) {
      return;
    }
    chart.options.plugins.zoom.zoom.wheel.enabled = false;
    chart.options.plugins.zoom.pan.enabled = false;
    chart.options.plugins.zoom.zoom.pinch.enabled = false;
    chart.update();
  }, []);

  return (
    <div>
      <label className="label cursor-pointer flex w-60 pl-5 pt-0 pb-5 gap-3">
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={isInteractiveMode}
          onChange={onClickHandler}
        />
        <span className="label-text">Toggle interactive mode</span>
      </label>
      <div className="overflow-x-auto">
        <div className="relative min-w-[50rem]">
          <Bar options={options} data={data} ref={chartRef} onClick={onClick} />
        </div>
      </div>
    </div>
  );
}
