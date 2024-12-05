import React from "react";

const ExpenseTable = ({ expenses, deleteExpense, editExpense }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Amount</th>
          <th>Created At</th>
          <th>Comments</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense._id}>
            <td>{expense.category}</td>
            <td>{expense.amount}</td>
            <td>{new Date(expense.createdAt).toLocaleString()}</td>
            <td>{expense.comments}</td>
            <td>
              <button onClick={() => editExpense(expense)}>Edit</button>
              <button onClick={() => deleteExpense(expense._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTable;
