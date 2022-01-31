// import { lazy } from "react";
import Layout from "../components/Layout";
import Addons from "../views/Addons";
import NotFound from "../views/NotFound";
import Settings from "../views/Settings"
import BrunchUp from "../views/BrunchUp";
import ChromoUp from "../views/ChromeoUp";
import { Navigate } from "react-router-dom";


const routes = [
  {
    path: "/brunch-pwa",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="brunch-updates" />
      },
      {
        path: "brunch-updates",
        element: <BrunchUp />
      },
      {
        path: "chromeos-updates",
        element: <ChromoUp />,
      },
      {
        path: "addons",
        element: <Addons />,
      },
      {
        path: "settings",
        element: <Settings />,
        // children: [
        //   { path: "/settings/:slug", element: <Event /> }
        // ]
      },
      { path: "*", element: <NotFound /> }
    ]
  },
  { path: "/", element: <Navigate to="brunch-pwa" /> }
];

export default routes/* .filter((route) => route.enabled) */;