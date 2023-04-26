import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "problemset" },
    { 
      path: "/problem/:id", 
      component: "problem",
      routes: [
        {path: "", component: "@/components/problem/Discribe/Discribe"},
        {path: "discribe", component: "@/components/problem/Discribe/Discribe"},
        {path: "comment", component: "@/components/problem/Comment/ProblemComment"}
      ]
    }
  ],
  npmClient: 'cnpm',
});
