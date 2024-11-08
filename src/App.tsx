import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Flex, Layout, Spin } from "antd";
import { Login } from "./pages/Login";
import TeamManagement from "./pages/TeamManagement";
import Todos from "./pages/Todos";
import PrivateRoute from "./Routes/PrivateRoute";
import HeaderComponent from "./components/Header";
import { useAuth } from "@workos-inc/authkit-react";
import CreateOrg from "./pages/CreateOrg";
const { Content, Footer } = Layout;

export function App() {
  const {
    user,
    getAccessToken,
    isLoading,
    signIn,

    organizationId,
    role,
    permissions
  } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = () => {
    // Replace with actual login check logic
    return !!localStorage.getItem("hackathon-authToken");
  };

  // This `/login` endpoint should be registered on the "Redirects" page of the
  // WorkOS Dashboard.
  // In a real app, this code would live in a route instead
  // of in the main <App/> component
  React.useEffect(() => {
    if (window.location.pathname === "/login" && !user) {
      const searchParams = new URLSearchParams(window.location.search);
      const context = searchParams.get("context") ?? undefined;
      console.log("context", context);
      signIn({ context });
    }
  }, [window.location, signIn]);
  React.useEffect(() => {
    if (user) {
      userHandler().then(() => {
        organizationId ? navigate("/todos") : navigate("/create-organisation");
      });

      console.log(user);
    }
  }, [user]);
  console.log(user);
  const userHandler = async () => {
    try {
      const accessToken = await getAccessToken();
      // Perform any additional actions with the accessToken here
      localStorage.setItem("hackathon-authToken", accessToken);
      localStorage.setItem("hackathon-user", JSON.stringify(user));
      localStorage.setItem("hackathon-organizationId", organizationId || "");
      localStorage.setItem("hackathon-role", role || "");
      localStorage.setItem(
        "hackathon-permissions",
        JSON.stringify(permissions)
      );
      console.log("accessToken", accessToken);
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
          }}
        >
          <Spin size="large" />
        </Content>
      </Layout>
    );
  }

  if (user && isLoggedIn()) {
    if (!organizationId) {
      return (
        <Routes>
          <Route path="/create-organisation" element={<CreateOrg />} />
        </Routes>
      );
    } else
      return (
        <Flex justify="center" align="center">
          <Layout className="layout" style={{ minHeight: "100vh" }}>
            {isLoggedIn() && <HeaderComponent />}
            <Content style={{ padding: "0 50px" }}>
              <div className="site-layout-content">
                <Routes>
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
              LoginRadius Hackathon 2024
            </Footer>
          </Layout>
        </Flex>
      );
  } else {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
}
