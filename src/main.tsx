import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "virtual:uno.css"
import App from "./App.tsx"
import "./index.css"
import Modal from "react-modal"

Modal.setAppElement("#root")
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
