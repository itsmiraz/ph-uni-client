import { Layout, Menu } from "antd";
import { SideBarItemsGenerator } from "../../utils/sideBarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ paddingLeft: "10px" }}
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div>
        <h1 style={{ color: "white", margin: "20px" }}>PH University </h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={SideBarItemsGenerator(adminPaths, "admin")}
      />
    </Sider>
  );
};

export default Sidebar;
