import { defineConfig } from "cypress";

export default defineConfig({
  videoCompression: 1,
  e2e: {
    baseUrl: "https://app.instagram-clone.net"
  }
});
