import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { AuthKitProvider } from "@workos-inc/authkit-react";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#1890ff", // Light theme primary color
        colorBgBase: "#ffffff", // Light theme background color
        colorTextBase: "#000000" // Light theme text color
      },
      components: {
        Layout: {
          headerBg: "#f0f2f5", // Light theme header background color
          bodyBg: "#ffffff" // Light theme body background color
        }

        // Add valid properties here if needed
      }
    }}
  >
    <BrowserRouter>
      <AuthKitProvider clientId={import.meta.env.VITE_REACT_APP_CLIENT_ID}>
        <App />
      </AuthKitProvider>
    </BrowserRouter>
  </ConfigProvider>
);
