import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { adminPaths } from "./admin.routes";
import { RouteGeneretor } from "../utils/routeGeneretor";
import { studentPaths } from "./student.routes";
import { facultyPaths } from "./faculty.routes";

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
  {
    path: "/student",
    element: <App />,
    children: RouteGeneretor(studentPaths),
  },
  {
    path: "/faculty",
    element: <App />,
    children: RouteGeneretor(facultyPaths),
  },
]);
