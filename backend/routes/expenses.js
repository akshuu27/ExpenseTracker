// const express = require("express");
// const jwt = require("jsonwebtoken");
// const Expense = require("../models/Expense");

// const router = express.Router();

// // Middleware to verify token
// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) return res.status(401).json({ error: "Access denied" });

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ error: "Invalid token" });
//     req.user = user;
//     next();
//   });
// };

// // Add Expense
// router.post("/", authenticate, async (req, res) => {
//   try {
//     const expense = new Expense({ ...req.body, user: req.user.id });
//     await expense.save();
//     res.status(201).json(expense);
//   } catch (err) {
//     res.status(400).json({ error: "Error adding expense" });
//   }
// });

// // Get Expenses
// router.get("/", authenticate, async (req, res) => {
//   try {
//     const expenses = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });
//     res.status(200).json(expenses);
//   } catch (err) {
//     res.status(400).json({ error: "Error fetching expenses" });
//   }
// });

// // Edit Expense
// router.put("/:id", authenticate, async (req, res) => {
//   try {
//     const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(expense);
//   } catch (err) {
//     res.status(400).json({ error: "Error editing expense" });
//   }
// });

// // Delete Expense
// router.delete("/:id", authenticate, async (req, res) => {
//   try {
//     await Expense.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Expense deleted" });
//   } catch (err) {
//     res.status(400).json({ error: "Error deleting expense" });
//   }
// });

// module.exports = router;







const express = require("express");
const Expense = require("../models/Expense");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Add Expense
router.post("/", authenticate, async (req, res) => {
  try {
    const expense = new Expense({ ...req.body, user: req.user.id });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: "Error adding expense" });
  }
});

// Get Expenses
router.get("/", authenticate, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(400).json({ error: "Error fetching expenses" });
  }
});

// Edit Expense
router.put("/:id", authenticate, async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(expense);
  } catch (err) {
    res.status(400).json({ error: "Error editing expense" });
  }
});

// Delete Expense
router.delete("/:id", authenticate, async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted" });
  } catch (err) {
    res.status(400).json({ error: "Error deleting expense" });
  }
});

module.exports = router;
