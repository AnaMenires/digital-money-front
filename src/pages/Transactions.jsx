import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyDollar,
  TrashSimple,
} from "phosphor-react";
import CardTransaction from "../components/CardTransaction/CardTransaction";
import ModalNewTransaction from "../components/ModalNewTransaction/ModalNewTransaction";
import axios from "axios";
import { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import { useTransactionContext } from "../contexts/TransactionContext";

function TransactionsPage() {
  const [open, setOpen] = useState(false);

  const {
    allTransactions,
    setAllTransactions,
    handleEditTransaction,
    depositsResult,
    withdrawsResult,
    total,
    handleDeleteTransaction,
  } = useTransactionContext();

  async function fetchTransactions() {
    const transactions = await axios.get("http://localhost:3000/transactions");

    setAllTransactions(transactions.data);
  }

  function handleOpenModal() {
    setOpen(true);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header handleOpenModal={handleOpenModal} />
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 -mt-24">
          <CardTransaction
            title="Entradas"
            background="bg-white"
            amount={depositsResult}
            icon={<ArrowCircleUp className="text-green-500" size={32} />}
          />

          <CardTransaction
            title="Saídas"
            amount={withdrawsResult}
            background="bg-white"
            icon={<ArrowCircleDown className="text-red-500" size={32} />}
          />

          <CardTransaction
            title="Total"
            background="bg-emerald-500"
            amount={total}
            icon={<CurrencyDollar size={32} />}
            textColor="text-white"
          />
        </div>

        <div className="overflow-x-auto mt-8">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="px-6 py-3 pb-4 font-medium">Título</th>
                <th className="px-6 py-3 pb-4 font-medium">Valor</th>
                <th className="px-6 py-3 pb-4 font-medium">Categoria</th>
                <th className="px-6 py-3 pb-4 font-medium">Data</th>
                <th className="px-6 py-3 pb-4 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allTransactions.map((transaction, index) => {
                return (
                  <tr
                    className="hover:bg-gray-50 bg-white"
                    key={index}
                    onClick={() => {
                      handleEditTransaction(transaction.id);
                    }}>
                    <td className="px-6 py-4">{transaction.title}</td>
                    <td className="px-6 py-4 text-green-500 font-medium">
                      {transaction.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="px-6 py-4">{transaction.category}</td>
                    <td className="px-6 py-4">{transaction.date}</td>
                    <td className="px-6 py-4">
                      <button
                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTransaction(transaction.id);
                        }}>
                        <TrashSimple
                          size={32}
                          weight="fill"
                          className="text-red-700"
                          
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <ModalNewTransaction open={open} setOpen={setOpen} />
      </main>
    </div>
  );
}

export default TransactionsPage;
