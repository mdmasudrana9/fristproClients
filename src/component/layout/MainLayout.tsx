import React from "react";

import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AppButton from "../ui/AppButton";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const { Header, Content } = Layout;

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    // Implement your logout logic here
    dispatch(logout());
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0, background: "#001529" }}>
          <AppButton
            label="Logout"
            onClick={handleLogout}
            className="absolute right-4 top-4"
          />
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
