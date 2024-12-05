import React, { useEffect, useState } from "react";
import AddExpense from "../components/Expenses/AddExpense";
import ExpenseTable from "../components/Expenses/ExpenseTable";
import API from "../api";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const { data } = await API.get("/expenses");
      setExpenses(data);
    } catch (err) {
      alert("Error fetching expenses");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      alert("Error deleting expense");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <AddExpense refreshExpenses={fetchExpenses} />
      <ExpenseTable expenses={expenses} deleteExpense={deleteExpense} />
    </div>
  );
};

export default Dashboard;
