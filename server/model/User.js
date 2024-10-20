const mongoose = require('mongoose');

// Create the schema for the expenses array
const expenseSchema = new mongoose.Schema({
  person: {
    give: { type: Number, default: 0 }, // Default value set to 0
    take: { type: Number, default: 0 }, // Default value set to 0
    net: { type: Number, default: 0 }   // Default value set to 0
  }
});

// Create the schema for the user
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: Number, required: true, unique: true },
  personalExpenses: { type: Number, default: 0 }, // Added personalExpenses with default 0
  expenses: [expenseSchema] // Array of person objects
});

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
