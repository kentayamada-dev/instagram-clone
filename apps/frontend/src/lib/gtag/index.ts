/* eslint-disable camelcase, @typescript-eslint/naming-convention */
import { constants } from "../../constants";
import type { GaEventType, GaPageviewType } from "./types";

const { GA_TRACKING_ID } = constants;

export const gaPageview: GaPageviewType = (pagePath) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: pagePath
  });
};

export const gaEvent: GaEventType = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    ...(label ? { event_label: label } : {}),
    ...(typeof value === "number" ? { value } : {})
  });
};
/* eslint-enable camelcase, @typescript-eslint/naming-convention */
