import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, Legend, Tooltip } from "chart.js";
import { Line, getElementAtEvent } from "react-chartjs-2";
import React from "react";
import bundleData from "../../assets/bundle.json";
import zoomPlugin from "chartjs-plugin-zoom";

const getColor = (seed) => "#" + Math.floor(((seed * 0.123 - 0) / (1 - 0)) * 16777215).toString(16);

ChartJS.register(zoomPlugin, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

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
        y: { min: 0, max: 300, minRange: 50 },
        x: { min: 0, max: 300, minRange: 2 }
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

const bytesToKb = (value) => Math.ceil((value / 1024) * Math.pow(10, 2)) / Math.pow(10, 2);

export default function BundleAnalysisStats() {
  const labels = bundleData.map((data) => data.date);
  const actionUrls = bundleData.map((data) => data.actionUrl);
  const buildData = bundleData.map((data) => data.data);
  const obj = buildData.reduce((res, item) => ({ ...res, ...item }));
  const keys = Object.keys(obj);
  const def = keys.reduce((result, key) => {
    result[key] = {
      raw: 0,
      gzip: 0
    };
    return result;
  }, {});
  let datasets = [];
  const result = buildData.map((item) => ({ ...def, ...item }));
  result.forEach((result) => {
    Object.entries(result).map(([key, value], index) => {
      const fileSize = bytesToKb(value.gzip);
      const foundObject = datasets.find((dataset) => dataset.label === key);
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
    });
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
      <div className="form-control mb-3">
        <label className="label cursor-pointer flex w-56 ml-5">
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={isInteractiveMode}
            onChange={onClickHandler}
          />
          <span className="label-text">Toggle interactive mode</span>
        </label>
      </div>
      <Line options={options} data={data} ref={chartRef} onClick={onClick} />
    </div>
  );
}
