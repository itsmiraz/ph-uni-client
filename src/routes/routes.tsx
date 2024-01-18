import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminDashboard from "../pages/Admin/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
]);
