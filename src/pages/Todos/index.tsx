import React, { useState, useEffect } from "react";
import { List, Button, Input, Form, Modal, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAuth } from "@workos-inc/authkit-react";

interface Todo {
  id: number;
  text: string;
  owner: string;
}
const fetchTodos = async (): Promise<Todo[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(dummyTodos), 1000));
};

let dummyTodos: Todo[] = [
  { id: 1, text: "Learn TypeScript", owner: "member" },
  { id: 2, text: "Build a Todo App", owner: "admin" }
];

const addTodo = async (todo: Todo): Promise<void> => {
  return new Promise((resolve) => {
    dummyTodos.push(todo);
    setTimeout(() => resolve(), 1000);
  });
};

const editTodo = async (todo: Todo): Promise<void> => {
  return new Promise((resolve) => {
    dummyTodos = dummyTodos.map((t) => (t.id === todo.id ? todo : t));
    setTimeout(() => resolve(), 1000);
  });
};

const deleteTodo = async (id: number): Promise<void> => {
  return new Promise((resolve) => {
    dummyTodos = dummyTodos.filter((t) => t.id !== id);
    setTimeout(() => resolve(), 1000);
  });
};

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [form] = Form.useForm();
  const { role } = useAuth();

  useEffect(() => {
    const loadTodos = async () => {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
      setLoading(false);
    };
    loadTodos();
  }, []);

  const handleAdd = () => {
    setCurrentTodo(null);
    setIsModalVisible(true);
  };

  const handleEdit = (todo: Todo) => {
    setCurrentTodo(todo);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
    message.success("Todo deleted successfully");
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (currentTodo) {
      const updatedTodo = { ...currentTodo, ...values };
      await editTodo(updatedTodo);
      setTodos(
        todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
      message.success("Todo updated successfully");
    } else {
      const newTodo = { id: Date.now(), ...values, owner: role };
      await addTodo(newTodo);
      setTodos([...todos, newTodo]);
      message.success("Todo added successfully");
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const canEditOrDelete = (todo: Todo) => {
    return (
      role === "owner" ||
      role === "admin" ||
      (role === "member" && todo.owner === role)
    );
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        disabled={role === "member"}
      >
        Add Todo
      </Button>
      <List
        loading={loading}
        dataSource={todos}
        renderItem={(todo) => (
          <List.Item
            actions={[
              <Button
                icon={<EditOutlined />}
                onClick={() => handleEdit(todo)}
                disabled={!canEditOrDelete(todo)}
              />,
              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(todo.id)}
                disabled={role !== "owner"}
              />
            ]}
          >
            {todo.text}
          </List.Item>
        )}
      />
      <Modal
        title={currentTodo ? "Edit Todo" : "Add Todo"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} initialValues={currentTodo || undefined}>
          <Form.Item
            name="text"
            rules={[{ required: true, message: "Please input the todo text!" }]}
          >
            <Input placeholder="Todo text" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Todos;
