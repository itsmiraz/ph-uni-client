import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { adminPaths } from "./admin.routes";
import { RouteGeneretor } from "../utils/routeGeneretor";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: RouteGeneretor(adminPaths),
  },
]);
