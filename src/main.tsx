import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { AuthKitProvider } from "@workos-inc/authkit-react";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthKitProvider clientId={import.meta.env.VITE_REACT_APP_CLIENT_ID}>
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
        <App />
      </ConfigProvider>
    </AuthKitProvider>
  </StrictMode>
);
