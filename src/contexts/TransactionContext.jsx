// Criando context de transações

import { createContext, useContext, useState } from "react";

const TransactionContext = createContext();
const useTransactionContext = () => useContext(TransactionContext);

const TransactionProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  function incrementTransactionCount() {
    setCount(count + 1);
  }
  return (
    <TransactionContext.Provider
      value={{ count, setCount, incrementTransactionCount }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export { TransactionProvider, useTransactionContext };
