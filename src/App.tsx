import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { Flex, Layout, Space } from "antd";
import { Login } from "./pages/Login";
import TeamManagement from "./pages/TeamManagement";
import Todos from "./pages/Todos";
import PrivateRoute from "./Routes/PrivateRoute";

const { Header, Content, Footer } = Layout;

export const App: React.FC = () => {
  const isLoggedIn = () => {
    // Replace with actual login check logic
    return !!localStorage.getItem("authToken");
  };

  return (
    <Flex justify="center" align="center">
      <Router>
        <Layout className="layout" style={{ minHeight: "100vh" }}>
          <Header>
            <div className="logo" />
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/team-management"
                  element={
                    <PrivateRoute
                      element={<TeamManagement />}
                      isAuthenticated={isLoggedIn()}
                    />
                  }
                />
                <Route
                  path="/todos"
                  element={
                    <PrivateRoute
                      element={<Todos />}
                      isAuthenticated={isLoggedIn()}
                    />
                  }
                />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Router>
    </Flex>
  );
};

export default App;
