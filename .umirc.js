import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "problemset" },
    { path: "/docs", component: "docs" },
  ],
  npmClient: 'cnpm',
});
