import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token_amount: { type: Number, required: true },
  winningStreak: { type: Number, default: 0 },
});

export default mongoose.model("User", userSchema);