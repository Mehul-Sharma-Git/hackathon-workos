import { useAuth } from "@workos-inc/authkit-react";
import { Button, Form, Flex } from "antd";

export function Login() {
  const {
    user,

    signIn,
    signUp,
    signOut
  } = useAuth();
  console.log(user);
  // React.useEffect(() => {
  //   if (window.location.pathname === "/login" && !user) {
  //     const searchParams = new URLSearchParams(window.location.search);
  //     const context = searchParams.get("context") ?? undefined;
  //     signIn({ context });
  //   }
  // }, [window.location, signIn]);

  // const performMutation = async () => {
  //   const accessToken = await getAccessToken();
  //   alert(`API request with accessToken: ${accessToken}`);
  // };

  return (
    <Flex justify="center" align="center">
      <Form layout="vertical">
        <Form.Item>
          <Button type="primary" onClick={() => signIn()}>
            Sign in
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="default" onClick={() => signUp()}>
            Sign up
          </Button>
          <Button type="default" onClick={() => signOut()}>
            Signout
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}
