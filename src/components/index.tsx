import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Avatar, Button } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { useAuth } from "@workos-inc/authkit-react";
const { Header } = Layout;

const fetchOrganizations = () => {
  // Dummy API call to fetch organizations
  return Promise.resolve([
    { id: 1, name: "Organization 1" },
    { id: 2, name: "Organization 2" },
    { id: 3, name: "Organization 3" }
  ]);
};

const HeaderComponent: React.FC = () => {
  const [organizations, setOrganizations] = useState<
    { id: number; name: string }[]
  >([]);
  const { signOut } = useAuth();
  const [selectedOrg, setSelectedOrg] = useState<{
    id: number;
    name: string;
  } | null>(null);

  useEffect(() => {
    // Fetch organizations when component mounts
    fetchOrganizations().then((orgs) => {
      setOrganizations(orgs);
      setSelectedOrg(orgs[0]);
    });
  }, []);

  const handleOrgChange = ({ key }: { key: string }) => {
    const selected = organizations.find((org) => org.id === parseInt(key));
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
        <Button type="link">Team Management</Button>
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
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderComponent;
