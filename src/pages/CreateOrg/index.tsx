import { useAuth } from "@workos-inc/authkit-react";
import { Button, Flex } from "antd";
import Title from "antd/es/typography/Title";

const CreateOrg = () => {
  const { getAccessToken } = useAuth();
  const createOrganisation = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await fetch("https://api.example.com/organisations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          name: "New Organisation"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create organisation");
      }

      const data = await response.json();
      console.log("Organisation created:", data);
      // Perform any additional actions with the created organisation data here
    } catch (error) {
      console.error("Error creating organisation:", error);
    }
  };
  return (
    <Flex justify="center" align="center" vertical>
      <Title level={3}> Create Organisation </Title>
      <Button type="primary" onClick={createOrganisation}>
        Create Organisation
      </Button>
    </Flex>
  );
};

export default CreateOrg;
