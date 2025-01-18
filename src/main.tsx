import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TicTacToeProvider } from "./game/contexts/TicTacToeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TicTacToeProvider>
      <App />
    </TicTacToeProvider>
  </StrictMode>,
);
