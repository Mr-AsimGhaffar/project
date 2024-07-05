import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundry.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
  // </React.StrictMode>
);
