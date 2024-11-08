import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Avatar, Button, Flex } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { useAuth } from "@workos-inc/authkit-react";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;

const fetchOrganizations = () => {
  // Dummy API call to fetch organizations
  return Promise.resolve([
    { id: "org_01HQ6H8KR6H9N41P8W3VQ207F9", name: "Test Organisation" },
    { id: "org_01JC5FXMFHRBDEGTK362KH6EKR", name: "Test 2" },
    { id: "org_01JC5SZR3S4RD87KW1XYPDZ80P", name: "wedddst" }
  ]);
};

const HeaderComponent: React.FC = () => {
  const [organizations, setOrganizations] = useState<
    { id: string; name: string }[]
  >([]);
  const { signOut, user, signIn } = useAuth();
  const [selectedOrg, setSelectedOrg] = useState<{
    id: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    // Fetch organizations when component mounts
    fetchOrganizations().then((orgs) => {
      setOrganizations(orgs);
      setSelectedOrg(orgs[0]);
    });
  }, []);

  const navigate = useNavigate();
  const handleOrgChange = ({ key }: { key: string }) => {
    const selected = organizations.find((org) => org.id === key);
    if (selected) {
      setSelectedOrg(selected);
      // Dummy function to switch organization on a global level

      console.log(`Switched to organization: ${selected.name}`);
    }
  };

  const handleLogout = () => {
    // Dummy function to handle logout
    localStorage.clear();
    signOut();
  };

  const orgMenu = (
    <Menu onClick={handleOrgChange}>
      {organizations.map((org) => (
        <Menu.Item key={org.id}>{org.name}</Menu.Item>
      ))}
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item key="team-management">
        <Button type="link" onClick={() => navigate("/team-management")}>
          Team Management
        </Button>
      </Menu.Item>
      <Menu.Item key="logout">
        <Button type="link" onClick={handleLogout}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="header">
      <div className="logo" />
      <Dropdown overlay={orgMenu}>
        <Button>
          {selectedOrg ? selectedOrg.name : "Select Organization"}{" "}
          <DownOutlined />
        </Button>
      </Dropdown>
      <div style={{ float: "right" }}>
        <Dropdown overlay={userMenu}>
          <Flex gap={8} align="center">
            {user?.email.split("@")[0]}
            <Avatar icon={<UserOutlined />} />
          </Flex>
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderComponent;
