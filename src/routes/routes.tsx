import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { adminPaths } from "./admin.routes";
import { RouteGeneretor } from "../utils/routeGeneretor";
import { studentPaths } from "./student.routes";
import { facultyPaths } from "./faculty.routes";
import Login from "../pages/Auth/Login";
import ProtectedRoute from "./ProtectedRoute.routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        {" "}
        <App />
      </ProtectedRoute>
    ),
    children: RouteGeneretor(adminPaths),
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute role="student">
        {" "}
        <App />
      </ProtectedRoute>
    ),
    children: RouteGeneretor(studentPaths),
  },
  {
    path: "/faculty",
    element: (
      <ProtectedRoute role="faculty">
        {" "}
        <App />
      </ProtectedRoute>
    ),
    children: RouteGeneretor(facultyPaths),
  },
]);
