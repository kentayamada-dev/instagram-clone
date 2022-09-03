import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, Legend, Tooltip } from "chart.js";
import { Line, getElementAtEvent } from "react-chartjs-2";
import React from "react";
import bundleData from "../../assets/bundle.json";
import moment from "moment";
import { faker } from "@faker-js/faker";

faker.seed(123);

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      position: "right"
    }
  }
};

const bytesToKb = (value) => Math.ceil((value / 1024) * Math.pow(10, 2)) / Math.pow(10, 2);

export default function BundleAnalysisStats() {
  const labels = bundleData.map((data) => moment(data.date).format("YYYY-MM-DD HH:mm:ss"));
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
    for (const [key, value] of Object.entries(result)) {
      const fileSize = bytesToKb(value.gzip);
      const foundObject = datasets.find((dataset) => dataset.label === key);
      if (foundObject) {
        foundObject.data = [...foundObject.data, fileSize];
      } else {
        datasets.push({
          label: key,
          data: [fileSize],
          borderColor: faker.color.rgb({ format: "css" }),
          backgroundColor: faker.color.rgb({ format: "css" })
        });
      }
    }
  });
  const data = {
    labels,
    datasets
  };
  const chartRef = React.useRef(null);
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

  return (
    <div>
      <Line options={options} data={data} ref={chartRef} onClick={onClick} />
    </div>
  );
}
