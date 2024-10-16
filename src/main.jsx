import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter } from "react-router-dom";
import Thh from "./components/com/Thh.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
   
      <App />
    </BrowserRouter>
  </StrictMode>
);
