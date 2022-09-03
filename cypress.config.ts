import { defineConfig } from "cypress";

export default defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    overwrite: false,
    html: false,
    json: true
  },
  videoCompression: 1,
  e2e: {
    baseUrl: "https://app.instagram-clone.net/",
    watchForFileChanges: false
  }
});
