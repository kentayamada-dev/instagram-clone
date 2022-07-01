import { defineConfig } from "cypress";

export default defineConfig({
  videoCompression: 1,
  e2e: {
    baseUrl: "http://localhost:3002"
  }
});
