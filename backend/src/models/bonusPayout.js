import mongoose from "mongoose";

const BonusPayoutSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    tossId: mongoose.Schema.Types.ObjectId,
    bonusMultiplier: Number,
    bonusAmount: Number,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("BonusPayout", BonusPayoutSchema);