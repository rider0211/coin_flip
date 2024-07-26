import User from "../models/user.js";
import CoinToss from "../models/coinToss.js";
import BonusPayout from "../models/bonusPayout.js";

const handleCoinToss = async (req, res) => {
  try {

    const { wager, choice } = req.body;
    const { userId } = req;

    if (!userId || !wager || !choice) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const user = await User.findById(userId);
    if (user.token_amount < wager) {
      throw new Error('Insufficient tokens');
    }

    user.token_amount -= wager;
    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    const win = result === choice;

    let payout = 0;

    if (win) {
      payout = wager * 2;
      user.token_amount += payout;
      user.winningStreak += 1;
    } else {
      user.winningStreak = 0;
    }

    await user.save();

    const toss = await CoinToss.create({
      userId,
      wager,
      choice,
      result,
      win,
      payout
    });

    if (win) {
      if (user.winningStreak === 3) {
        const bonusAmount = wager * 3;
        user.token_amount += bonusAmount;
        await BonusPayout.create({
          userId,
          tossId: toss._id,
          bonusMultiplier: 3,
          bonusAmount
        });
        await user.save();
      } else if (user.winningStreak === 5) {
        const bonusAmount = wager * 10;
        user.token_amount += bonusAmount;
        await BonusPayout.create({
          userId,
          tossId: toss._id,
          bonusMultiplier: 10,
          bonusAmount
        });
        user.winningStreak = 0;
        await user.save();
      }
    }
    const recentWagers = await CoinToss.find({ userId }).sort({ createdAt: -1 }).limit(10).lean();
    for (let wager of recentWagers) {
      const bonus = await BonusPayout.findOne({ tossId: wager._id }).lean();
      wager.bonus = bonus ? bonus.bonusAmount : 0;
    }
    const response_data = { result, win, payout, token_amount: user.token_amount, recentWagers };
    res.status(200).json(response_data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export default handleCoinToss;