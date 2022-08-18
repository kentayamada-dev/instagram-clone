/* eslint @typescript-eslint/naming-convention: ["error", {selector: "property", format: ["UPPER_CASE"] } ]*/

const SITE_URL = "https://app.instagram-clone.net";

export const constants = {
  API_URL: process.env["NEXT_PUBLIC_INSTAGRAM_CLONE_API_URL"] ?? "",
  CLOUDINARY: {
    API_URL: "https://api.cloudinary.com/v1_1/kentayamada/image/upload",
    UPLOAD_PRESET: "instagram-clone"
  },
  COLORS: {
    // https://www.htmlcsscolor.com/
    BLACK_PEARL: "#04111D",
    BUNKER: "#202225",
    DODGER_BLUE: "#0095F6",
    EBONY: "#303339",
    GAINSBORO: "#DBDBDB",
    RADICAL_RED: "#ED4956",
    SNOW: "#FAFAFA",
    SUVA_GREY: "#8E8E8E",
    WHITE: "#FFFFFF"
  },
  GA_TRACKING_ID: process.env["NEXT_PUBLIC_GOOGLE_ANALYTICS_ID"],
  LINKS: {
    APOLLO_LINK: "https://studio.apollographql.com/public/Instagram-Clone-b7jzle?variant=current",
    GITHUB_LINK: "https://github.com/kentayamada-dev/instagram-clone",
    STORYBOOK_LINK: `${SITE_URL}/storybook`
  },
  SITE_URL
};
