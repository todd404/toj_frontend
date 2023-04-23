import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "problemset" },
    { path: "/problem/:id", component: "problem"}
  ],
  npmClient: 'cnpm',
});
