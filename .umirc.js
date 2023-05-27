import { defineConfig } from "umi";

//Umi的路由会默认使用layouts的index.js里的layout,component属性设置的是layout里的<Outlet>的component
//换而言之，这里所有路由都是一个默认layout的子路由
//所以想要换layout需要在/src/layouts/index.js里自己判断在哪个路由返回哪个layout

export default defineConfig({
  routes: [
    { path: "/", component: "problemset" },
    { 
      path: "/problem/:id", 
      component: "problem",
      routes: [
        {path: "", component: "@/components/problem/Discribe/Discribe"},
        {path: "discribe", component: "@/components/problem/Discribe/Discribe"},
        {path: "comment", component: "@/components/problem/Comment/ProblemComment"},
        {path: "history", component: "@/components/problem/History/HistoryList"},
      ]
    },
    {
      path: "/admin", component: "ProblemManager",
    },
    {
      path: "/admin/problem-manager", component: "ProblemManager",
    },
    {
      path: "/admin/edit/:id", component: "ProblemEdit"
    },
    {
      path: "/admin/add-problem", component: "AddProblem"
    },
    {
      path: "/admin/user-manager", component: "usermanager"
    },
    {
      path: "/admin/edit-user/:userid", component: "UserEdit"
    },
    {
      path: "/register", component: "register"
    },
    {
      path: "/usercenter", component: "UserCenter"
    },
  ],
  npmClient: 'cnpm',
  esbuildMinifyIIFE: true,
  title: 'TOJ',
  define: {
    SERVER_BASE: "http://172.24.89.158:8080"
  }
});
