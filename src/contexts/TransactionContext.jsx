// Criando context de transações
import { useNavigate } from "react-router-dom";

import { createContext, useContext, useState } from "react";
import { API_BASE_URL } from "../utils/constants";
import axios from "axios";

const TransactionContext = createContext();
const useTransactionContext = () => useContext(TransactionContext);

const TransactionProvider = ({ children }) => {
  const [allTransactions, setAllTransactions] = useState([]);

   const navigate = useNavigate();
 function handleEditTransaction(id) {
   navigate("/transactions/" + id);
 }

 const depositsResult = allTransactions.reduce((prev, current) => {
  if (current.transactionType === "deposit") {
    return prev + current.price;
  }
  return prev;
}, 0);
const withdrawsResult = allTransactions.reduce((prev, current) => {
  if (current.transactionType === "withdraw") {
    return prev + current.price;
  }
  return prev;
}, 0);
const total = depositsResult - withdrawsResult;

async function handleDeleteTransaction(id) {
  const confirmDelete = window.confirm("Deseja realmente excluir essa transação?");

  if (!confirmDelete) {
    return;
  }

  await axios.delete(`${API_BASE_URL}/transactions/${id}`);
}

  return (
    <TransactionContext.Provider
      value={{
        allTransactions,
        setAllTransactions,
        handleEditTransaction,
        depositsResult,
        withdrawsResult,
        total,
        handleDeleteTransaction,

      }}>
      {children}
    </TransactionContext.Provider>
  );
};

export { TransactionProvider, useTransactionContext };
