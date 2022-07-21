import { defineConfig } from "cypress";

export default defineConfig({
  videoCompression: 1,
  e2e: {
    baseUrl: process.env.E2E_BASE_URL,
    watchForFileChanges: false
  }
});
