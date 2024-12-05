import React, { useState } from "react";
import API from "../../api";

const AddExpense = ({ refreshExpenses }) => {
  const [form, setForm] = useState({ category: "", amount: "", comments: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/expenses", form);
      refreshExpenses();
      setForm({ category: "", amount: "", comments: "" });
    } catch (err) {
      alert("Error adding expense");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Comments"
        value={form.comments}
        onChange={(e) => setForm({ ...form, comments: e.target.value })}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpense;
