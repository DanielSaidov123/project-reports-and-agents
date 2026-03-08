import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  agentCode: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["agent", "admin"],
    default: "agent"
  },
 
},{ timestamps: true });

export const User = mongoose.model("User", userSchema);
