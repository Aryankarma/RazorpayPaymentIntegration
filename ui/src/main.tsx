import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PaymentSuccess from "./pages/PaymentSuccess.tsx";

createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/paymentsuccess" element={<PaymentSuccess />} />
    </Routes>
  </Router>
);
