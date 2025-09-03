import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  type: {
    type: String,
    enum: ['income', 'expense', 'saving', 'investment'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  note: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export const TransactionModel = mongoose.model("Transaction", transactionSchema);
