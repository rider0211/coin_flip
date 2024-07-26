import bcrypt from "bcryptjs";
import User from "../models/user.js";

const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist" });
    }

    if (!req.userId) {
      return res.json({ message: "Unauthenticated" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const updatePassword = await User.findByIdAndUpdate(
      existingUser._id,
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).json(updatePassword);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default changePassword;