import mongoose from "mongoose";

const CoinTossSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    wager: Number,
    choice: String,
    result: String,
    win: Boolean,
    payout: Number,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("CoinToss", CoinTossSchema);