import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  type: {
    type: String,
    required: [true, 'Account type is required'],
    enum: ['cash', 'bank', 'investment']
  },
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    enum: ['USD','MXN','EUR']
  },
  balance: {
    type: Number,
    required: [true, 'Balance is required'],
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

export const AccountModel = mongoose.model("Account", accountSchema);
