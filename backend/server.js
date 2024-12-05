const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expenses");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const User = require('./models/User');
// const Expense = require('./models/Expense');
// const verifyToken = require('./middleware/verifyToken');

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/expenseTracker', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log("Connected to MongoDB");
// }).catch((err) => {
//   console.error("MongoDB connection error:", err);
// });

// const app = express();
// app.use(bodyParser.json());

// // Middleware to verify JWT token
// app.use('/api/expenses', verifyToken);

// // User Registration (Sign Up)
// app.post('/api/signup', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = new User({ username, password });
//     await user.save();
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (err) {
//     res.status(400).json({ message: 'Error signing up' });
//   }
// });

// // User Login
// app.post('/api/login', async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });

//   if (!user) return res.status(404).json({ message: 'User not found' });

//   const isMatch = await user.comparePassword(password);
//   if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//   const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1d' });
//   res.json({ token });
// });

// // Add Expense
// app.post('/api/expenses', async (req, res) => {
//   const { category, amount, comments } = req.body;
//   const userId = req.user.id;

//   const expense = new Expense({
//     category,
//     amount,
//     comments,
//     userId,
//   });

//   await expense.save();
//   res.status(201).json({ message: 'Expense added successfully', expense });
// });

// // View Expenses
// app.get('/api/expenses', async (req, res) => {
//   const userId = req.user.id;
//   const expenses = await Expense.find({ userId }).sort({ createdAt: -1 });
//   res.json(expenses);
// });

// // Edit Expense
// app.put('/api/expenses/:id', async (req, res) => {
//   const { id } = req.params;
//   const { category, amount, comments } = req.body;
//   const userId = req.user.id;

//   const expense = await Expense.findOne({ _id: id, userId });
//   if (!expense) return res.status(404).json({ message: 'Expense not found' });

//   expense.category = category || expense.category;
//   expense.amount = amount || expense.amount;
//   expense.comments = comments || expense.comments;
//   expense.updatedAt = Date.now();

//   await expense.save();
//   res.json({ message: 'Expense updated successfully', expense });
// });

// // Delete Expense
// app.delete('/api/expenses/:id', async (req, res) => {
//   const { id } = req.params;
//   const userId = req.user.id;

//   const expense = await Expense.findOneAndDelete({ _id: id, userId });
//   if (!expense) return res.status(404).json({ message: 'Expense not found' });

//   res.json({ message: 'Expense deleted successfully' });
// });

// // Start Server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
