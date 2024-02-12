import { Button, Layout, Menu } from "antd";
import { SideBarItemsGenerator } from "../../utils/sideBarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { logOut } from "../../redux/feature/auth/authSlice";
import { VerifyToken } from "../../utils/verifyToken";
import { TUser } from "../../types/user.types";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  const { token } = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  let user;
  if (token) {
    user = VerifyToken(token);
  }

  let sidebarItems;

  switch ((user as TUser)?.role) {
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
    dispatch(logOut());
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
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: "20px" }}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={sidebarItems}
          />
        </div>
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
