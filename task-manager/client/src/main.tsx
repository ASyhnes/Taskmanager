import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { registerServiceWorker, setupInstallPrompt } from "./registerSW";

// Enregistrer le Service Worker pour la PWA
registerServiceWorker();

// Configurer le prompt d'installation
setupInstallPrompt();

createRoot(document.getElementById("root")!).render(<App />);
