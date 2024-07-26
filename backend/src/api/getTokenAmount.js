import User from "../models/user.js";

const getTokenAmount = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ token_amount: user.token_amount });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}
export default getTokenAmount;