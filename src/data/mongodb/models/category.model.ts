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
  }
});

export const CategoryModel = mongoose.model("Category", categorySchema);
