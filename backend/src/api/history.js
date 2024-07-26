import CoinToss from "../models/coinToss.js";
import BonusPayout from "../models/bonusPayout.js";

const recentWager = async (req, res) => {
    try {
        const { userId } = req;
        const recentWagers = await CoinToss.find({ userId }).sort({ createdAt: -1 }).limit(10).lean();
        for (let wager of recentWagers) {
            const bonus = await BonusPayout.findOne({ tossId: wager._id }).lean();
            wager.bonus = bonus ? bonus.bonusAmount : 0;
        }
        res.status(200).json(recentWagers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export default recentWager;