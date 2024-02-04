import { AcademicDepartment } from "../pages/Admin/AcademicDepartment/AcademicDepartment";
import CreateAcadmicDepartment from "../pages/Admin/AcademicDepartment/CreateAcadmicDepartment";
import AcademicFaculty from "../pages/Admin/AcademicFaculty/AcademicFaculty";
import CreateAcademicFaculty from "../pages/Admin/AcademicFaculty/CreateAcademicFaculty";
import AcademicSemiseter from "../pages/Admin/AcademicManagement/AcademicSemiseter";
import CreateAcademicSemester from "../pages/Admin/AcademicManagement/CreateAcademicSemester";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import CreateAdmin from "../pages/Admin/CreateAdmin";
import CreateFaculty from "../pages/Admin/CreateFaculty";
import CreateStudent from "../pages/Admin/CreateStudent";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Academic Semister",
        path: "academic-semister",
        element: <AcademicSemiseter />,
      },
      {
        name: "Create A. Semester",
        path: "create-academic-semister",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcadmicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
];
