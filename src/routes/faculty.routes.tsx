import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
import OfferedCourse from "../pages/Admin/CourseManagment/OfferedCourse";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <OfferedCourse />,
  },
];
