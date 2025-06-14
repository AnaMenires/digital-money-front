import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login.jsx";
import TransactionsPage from "./pages/Transactions.jsx";
import TransactionDetails from "./pages/TransactionDetails.jsx";
import { ToastContainer } from "react-toastify";
import { TransactionProvider } from "./contexts/TransactionContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <TransactionProvider>
        
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/transactions/:id" element={<TransactionDetails />} />
          </Routes>
        
      </TransactionProvider>
    </BrowserRouter>

    <ToastContainer />
  </StrictMode>
);
