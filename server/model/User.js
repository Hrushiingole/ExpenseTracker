import mongoose from "mongoose";

// Create the schema for the expenses array
const expenseSchema = new mongoose.Schema({
  person: {
    name: { type: String },
    give: { type: Number, default: 0 }, // Default value set to 0
    take: { type: Number, default: 0 }, // Default value set to 0
    net: { type: Number, default: 0 }   // Default value set to 0
  }
});

// Create the schema for the user
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true, unique: true },
  personalExpenses: { type: Number, default: 0 }, // Added personalExpenses with default 0
  expenses: [expenseSchema], // Array of person objects
  netAmount: { type: Number, default: 0 } // Added netAmount with default 0
});

// Method to calculate net for each person's expenses
userSchema.methods.calculatePersonNets = function () {
  this.expenses.forEach(expense => {
    // Calculate net for each person based on their give and take
    expense.person.net = expense.person.give - expense.person.take;
  });
};

// Method to calculate total netAmount for the user
userSchema.methods.calculateNetAmount = function () {
  const totalGive = this.expenses.reduce((acc, expense) => acc + expense.person.give, 0);
  const totalTake = this.expenses.reduce((acc, expense) => acc + expense.person.take, 0);
  
  // Calculate netAmount based on personal expenses, total give, and total take
  this.netAmount = totalGive - totalTake + this.personalExpenses;
};

// Middleware to automatically calculate netAmount and person nets before saving the user
userSchema.pre('save', function (next) {
  this.calculatePersonNets(); // Calculate net for each person
  this.calculateNetAmount();   // Calculate user's netAmount
  next();
});

// Create the model
const User = mongoose.model('User', userSchema);

export default User;
