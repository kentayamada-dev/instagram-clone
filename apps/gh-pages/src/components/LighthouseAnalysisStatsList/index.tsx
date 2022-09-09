import { Chart, LinearScale, CategoryScale, BarElement, Legend, Tooltip } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { useState } from "react";
import lighthouseData from "../../assets/lighthouse.json";
import { getColor } from "../../utils/getColor";
import { LighthouseAnalysisStats } from "../LighthouseAnalysisStats";
import type { LighthouseAnalysisStatsProps } from "../LighthouseAnalysisStats/types";
import type { LighthouseAnalysisStatsListType } from "./types";
import type { ChartOptions, ChartData } from "chart.js";

Chart.register(zoomPlugin, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type ScoreKeysType = keyof typeof lighthouseData[0]["data"][0]["scores"];

/* eslint-disable id-length */
const mobileOptions: ChartOptions<"bar"> = {
  plugins: {
    legend: {
      position: "right"
    },
    tooltip: {
      callbacks: {
        beforeTitle: () => "Device: Mobile",
        title: (context) => `Date: ${context[0]?.label ?? ""}`
      },
      titleFont: {
        weight: "normal"
      }
    },
    zoom: {
      limits: {
        y: { max: 100, min: 0, minRange: 10 }
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
    y: { title: { display: true, text: "Score" } }
  }
};

const desktopOptions: ChartOptions<"bar"> = {
  plugins: {
    legend: {
      position: "right"
    },
    tooltip: {
      callbacks: {
        beforeTitle: () => "Device: Desktop",
        title: (context) => `Date: ${context[0]?.label ?? ""}`
      },
      titleFont: {
        weight: "normal"
      }
    },
    zoom: {
      limits: {
        y: { max: 100, min: 0, minRange: 10 }
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
    y: { title: { display: true, text: "Score" } }
  }
};
/* eslint-enable id-length */

export const LighthouseAnalysisStatsList: LighthouseAnalysisStatsListType = () => {
  const [mobileSelectOption, setMobileSelectOption] = useState("/");
  const [desktopSelectOption, setDesktopSelectOption] = useState("/");
  const labels = lighthouseData.map((data) => data.date);
  const actionUrls = lighthouseData.map((data) => data.actionUrl);
  const latestScore = lighthouseData.slice(-1)[0];
  const scoreKeys = Object.keys(latestScore?.data[0]?.scores ?? {});
  const selectOptions = [...new Set(latestScore?.data.map((data) => new URL(data.url).pathname))];
  const desktopDatasets: ChartData<"bar">["datasets"] = [];
  const mobileDatasets: ChartData<"bar">["datasets"] = [];

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
      const desktopScore = foundDesktopObj ? foundDesktopObj.scores[value as ScoreKeysType] : 0;
      const mobileScore = foundMobileObj ? foundMobileObj.scores[value as ScoreKeysType] : 0;
      if (foundDesktopData && foundMobileData) {
        foundDesktopData.data = [...foundDesktopData.data, desktopScore];
        foundMobileData.data = [...foundMobileData.data, mobileScore];
      } else {
        const color = getColor(index);
        desktopDatasets.push({
          backgroundColor: color,
          borderColor: color,
          data: [desktopScore],
          label: value
        });
        mobileDatasets.push({
          backgroundColor: color,
          borderColor: color,
          data: [mobileScore],
          label: value
        });
      }
    });
  }

  const handleMobileSelectChange: LighthouseAnalysisStatsProps["handleSelectChange"] = (event) =>
    setMobileSelectOption(event.target.value);
  const handleDesktopSelectChange: LighthouseAnalysisStatsProps["handleSelectChange"] = (event) =>
    setDesktopSelectOption(event.target.value);

  const mobileData = {
    datasets: mobileDatasets,
    labels
  };
  const desktopData = {
    datasets: desktopDatasets,
    labels
  };

  return (
    <>
      <LighthouseAnalysisStats
        actionUrls={actionUrls}
        data={mobileData}
        handleSelectChange={handleMobileSelectChange}
        options={mobileOptions}
        selectOptions={selectOptions}
        title="Mobile Mode"
      />
      <LighthouseAnalysisStats
        actionUrls={actionUrls}
        data={desktopData}
        handleSelectChange={handleDesktopSelectChange}
        options={desktopOptions}
        selectOptions={selectOptions}
        title="Desktop Mode"
      />
    </>
  );
};
