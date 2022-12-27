import { lazy } from "solid-js";

export const routes = [
  {
    path: "/",
    component: lazy(() => import("./pages/Home")),
  },
  {
    path: "/bracket",
    component: lazy(() => import("./pages/Bracket")),
  },
];
