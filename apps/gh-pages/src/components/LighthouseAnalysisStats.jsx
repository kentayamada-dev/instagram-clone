import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Legend, Tooltip } from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import React from "react";
import lighthouseData from "../../assets/lighthouse.json";
import zoomPlugin from "chartjs-plugin-zoom";
import { getColor } from "../utils";

ChartJS.register(zoomPlugin, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const mobileOptions = {
  scales: {
    x: { title: { display: true, text: "Date" } },
    y: { title: { display: true, text: "Score" } }
  },
  plugins: {
    tooltip: {
      titleFont: {
        weight: "normal"
      },
      callbacks: {
        beforeTitle: () => "Device: Mobile",
        title: (context) => `Date: ${context[0]["label"]}`
      }
    },
    zoom: {
      pan: {
        enabled: true
      },
      limits: {
        y: { min: 0, max: 100, minRange: 10 }
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

const desktopOptions = {
  scales: {
    x: { title: { display: true, text: "Date" } },
    y: { title: { display: true, text: "Score" } }
  },
  plugins: {
    tooltip: {
      titleFont: {
        weight: "normal"
      },
      callbacks: {
        beforeTitle: () => "Device: Desktop",
        title: (context) => `Date: ${context[0]["label"]}`
      }
    },
    zoom: {
      pan: {
        enabled: true
      },
      limits: {
        y: { min: 0, max: 100, minRange: 10 }
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

export default function LighthouseAnalysisStatsList() {
  const [mobileSelectOption, setMobileSelectOption] = React.useState("/");
  const [desktopSelectOption, setDesktopSelectOption] = React.useState("/");
  const labels = lighthouseData.map((data) => data.date);
  const actionUrls = lighthouseData.map((data) => data.actionUrl);
  const latestScore = lighthouseData.slice(-1)[0];
  const scoreKeys = Object.keys(latestScore.data[0].scores);
  const selectOptions = [...new Set(latestScore.data.map((data) => new URL(data.url).pathname))];
  const desktopDatasets = [];
  const mobileDatasets = [];
  for (const { data } of lighthouseData) {
    const foundDesktopObj = data.find(
      (obj) => new URL(obj.url).pathname === desktopSelectOption && obj.emulatedFormFactor === "desktop"
    );
    const foundMobileObj = data.find(
      (obj) => new URL(obj.url).pathname === mobileSelectOption && obj.emulatedFormFactor === "mobile"
    );
    scoreKeys.forEach((value, index) => {
      const foundDesktopData = desktopDatasets.find((dataset) => dataset.label === value);
      const foundMobileData = mobileDatasets.find((dataset) => dataset.label === value);
      const desktopScore = foundDesktopObj ? foundDesktopObj.scores[value] : 0;
      const mobileScore = foundMobileObj ? foundMobileObj.scores[value] : 0;
      if (foundDesktopData && foundMobileData) {
        foundDesktopData.data = [...foundDesktopData.data, desktopScore];
        foundMobileData.data = [...foundMobileData.data, mobileScore];
      } else {
        const color = getColor(index);
        desktopDatasets.push({
          label: value,
          data: [desktopScore],
          borderColor: color,
          backgroundColor: color
        });
        mobileDatasets.push({
          label: value,
          data: [mobileScore],
          borderColor: color,
          backgroundColor: color
        });
      }
    });
  }
  const handleMobileSelectChange = (e) => setMobileSelectOption(e.target.value);
  const handleDesktopSelectChange = (e) => setDesktopSelectOption(e.target.value);
  const mobileData = {
    labels,
    datasets: mobileDatasets
  };

  const desktopData = {
    labels,
    datasets: desktopDatasets
  };

  const openUrl = (element) => {
    if (!element.length) return;
    const { index } = element[0];
    window.open(actionUrls[index], "_blank");
  };

  return (
    <>
      <LighthouseAnalysisStats
        title="Mobile Mode"
        handleSelectChange={handleMobileSelectChange}
        openUrl={openUrl}
        options={mobileOptions}
        data={mobileData}
        selectOptions={selectOptions}
      />
      <LighthouseAnalysisStats
        title="Desktop Mode"
        handleSelectChange={handleDesktopSelectChange}
        openUrl={openUrl}
        options={desktopOptions}
        data={desktopData}
        selectOptions={selectOptions}
      />
    </>
  );
}

function LighthouseAnalysisStats({ title, openUrl, handleSelectChange, options, data, selectOptions }) {
  const chartRef = React.useRef(null);
  const [isInteractiveMode, setIsInteractiveMode] = React.useState(false);

  const onClick = (event) => {
    const { current: chart } = chartRef;
    if (!chart) {
      return;
    }
    openUrl(getElementAtEvent(chart, event));
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
    <>
      <p className="text-lg font-bold my-0 ml-5">{title}</p>
      <div className="flex gap-3 sm:gap-5 ml-5">
        <label className="label cursor-pointer flex flex-col p-0">
          <span className="label-text">Toggle interactive mode</span>
          <input
            type="checkbox"
            className="toggle toggle-primary mb-3"
            checked={isInteractiveMode}
            onChange={onClickHandler}
          />
        </label>
        <label className="label p-0 cursor-pointer flex flex-col items-start">
          <span className="label-text">Select Path</span>
          <select defaultValue="" className="select select-primary" onChange={handleSelectChange}>
            {selectOptions.map((address, key) => (
              <option key={key} value={address}>
                {address}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="overflow-x-auto">
        <div className="relative min-w-[45rem]">
          <Bar options={options} data={data} ref={chartRef} onClick={onClick} />
        </div>
      </div>
    </>
  );
}
