import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Category name is required']
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Category type is required']
  },
  description: {
    type: String
  },
  icon: {
    type: String
  },
  color: {
    type: String
  },
  transactionCount: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    default: 0
  }
});

export const CategoryModel = mongoose.model("Category", categorySchema);
