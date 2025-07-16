import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import App from "./App";
import { DrawerProvider } from "./components/contexts/DrawerContext";
import ChatPopupComponent from "./components/ChatPopupComponent";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DrawerProvider>
      <App >
        <ChatPopupComponent />
      </App>
    </DrawerProvider>
  </StrictMode>
);
