import { Button, Layout, Menu } from "antd";
import { SideBarItemsGenerator } from "../../utils/sideBarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { logOut } from "../../redux/feature/auth/authSlice";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  const state = useAppSelector(state => state.auth);
  const disPatch = useAppDispatch();
  const currentUserRole = state?.user?.role;

  let sidebarItems;

  switch (currentUserRole) {
    case userRole.ADMIN:
      sidebarItems = SideBarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebarItems = SideBarItemsGenerator(facultyPaths, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      sidebarItems = SideBarItemsGenerator(studentPaths, userRole.STUDENT);
      break;

    default:
      break;
  }

  const handleLogout = () => {
    disPatch(logOut());
  };

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div
        style={{
          paddingLeft: "10px",
          display: "flex",
          height: "100vh",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1 style={{ color: "white", margin: "20px" }}>PH University </h1>
        </div>
        <div style={{ flex: 1 }}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={sidebarItems}
          />
        </div>
        <div style={{ marginTop: "auto", marginBottom: "10px" }}>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
