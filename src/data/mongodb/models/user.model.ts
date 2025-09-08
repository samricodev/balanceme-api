import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  img: {
    type: String,
  },
  accounts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  }],
  categories:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  role: {
    type: [String],
    default: ['USER-ROLE'],
    enum: ['USER-ROLE', 'ADMIN-ROLE']
  },
  enableNotifications: {
    type: Boolean,
    default: true
  },
  enable2FA: {
    type: Boolean,
    default: false
  },
  automaticLimits: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const UserModel = mongoose.model("User", userSchema);
