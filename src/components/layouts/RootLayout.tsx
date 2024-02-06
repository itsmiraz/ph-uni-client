import { Layout, theme } from "antd";
const { Header, Content } = Layout;
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const RootLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />

      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ overflowY: "auto" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,

              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
