import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Select, message } from "antd";
import { useAuth } from "@workos-inc/authkit-react";

const { Option } = Select;

const TeamManagement: React.FC = () => {
  const { role } = useAuth();
  interface TeamMember {
    id: number;
    name: string;
    email: string;
    role: string;
  }

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("member");

  useEffect(() => {
    // Dummy function to fetch team members
    const fetchTeamMembers = async () => {
      const members = [
        { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "owner" }
      ];
      setTeamMembers(members);
    };

    fetchTeamMembers();
  }, []);

  const handleRemoveMember = (id: number) => {
    // Dummy function to remove a team member
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
    message.success("Member removed successfully");
  };

  const handleInviteMember = () => {
    // Dummy function to invite a new team member
    const newMember = {
      id: teamMembers.length + 1,
      name: "New Member",
      email: newMemberEmail,
      role: newMemberRole
    };
    setTeamMembers([...teamMembers, newMember]);
    setIsInviteModalVisible(false);
    message.success("Member invited successfully");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role"
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        console.log(text),
        (
          <>
            {role === "owner" && (
              <Button type="link" onClick={() => handleRemoveMember(record.id)}>
                Remove
              </Button>
            )}
          </>
        )
      )
    }
  ];

  if (role === "member") {
    return <div>You do not have permission to view this section.</div>;
  }

  return (
    <div>
      <h1>Team Management</h1>
      {role !== "member" && (
        <Button type="primary" onClick={() => setIsInviteModalVisible(true)}>
          Invite New Member
        </Button>
      )}
      <Table columns={columns} dataSource={teamMembers} rowKey="id" />

      <Modal
        title="Invite New Member"
        visible={isInviteModalVisible}
        onOk={handleInviteMember}
        onCancel={() => setIsInviteModalVisible(false)}
      >
        <Input
          placeholder="Email"
          value={newMemberEmail}
          onChange={(e) => setNewMemberEmail(e.target.value)}
        />
        <Select
          value={newMemberRole}
          onChange={(value) => setNewMemberRole(value)}
          style={{ width: "100%", marginTop: 10 }}
        >
          <Option value="member">Member</Option>
          <Option value="admin">Admin</Option>
          <Option value="owner">Owner</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default TeamManagement;
