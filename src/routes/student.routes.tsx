import OfferedCourse from "../pages/Admin/CourseManagment/OfferedCourse";
import StudentDashboard from "../pages/Student/StudentDashboard";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <OfferedCourse />,
  },
];
