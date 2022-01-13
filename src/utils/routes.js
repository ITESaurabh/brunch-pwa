// import { lazy } from "react";
import Layout from "../components/Layout";
import Addons from "../views/Addons";
import NotFound from "../views/NotFound";
import Settings from "../views/Settings"
import BrunchUp from "../views/BrunchUp";
import ChromoUp from "../views/ChromeoUp";


const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <BrunchUp /> },
      {
        path: "/chromeos-updates",
        element: <ChromoUp />,
      },
      {
        path: "/addons",
        element: <Addons />,
      },
      {
        path: "/settings",
        element: <Settings />,
        // children: [
        //   { path: "/settings/:slug", element: <Event /> }
        // ]
      },
      { path: "*", element: <NotFound /> }
    ]
  }
];

export default routes/* .filter((route) => route.enabled) */;