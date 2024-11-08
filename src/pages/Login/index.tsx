import { useAuth } from "@workos-inc/authkit-react";
import React from "react";
import { Button, Spin, Layout, Form } from "antd";
import { useNavigate } from "react-router-dom";
const { Content } = Layout;

export function Login() {
  const {
    user,
    getAccessToken,
    isLoading,
    signIn,
    signUp,
    organizationId,
    role,
    permissions
  } = useAuth();
  const navigate = useNavigate();

  //   React.useEffect(() => {
  //     if (window.location.pathname === "/login") {
  //       const searchParams = new URLSearchParams(window.location.search);
  //       const context = searchParams.get("context") ?? undefined;
  //       signIn({ context });
  //     }
  //   }, [window.location, signIn]);
  React.useEffect(() => {
    if (user) {
      userHandler().then(() => {
        navigate("/todos");
      });
    }
  }, [user, history]);

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

  const performMutation = async () => {
    const accessToken = await getAccessToken();
    alert(`API request with accessToken: ${accessToken}`);
  };

  return (
    <Layout>
      <Content style={{ padding: "50px", maxWidth: "400px", margin: "auto" }}>
        {
          <Form layout="vertical">
            <Form.Item>
              <Button type="primary" block onClick={() => signIn()}>
                Sign in
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="default" block onClick={() => signUp()}>
                Sign up
              </Button>
            </Form.Item>
          </Form>
        }
      </Content>
    </Layout>
  );
}
