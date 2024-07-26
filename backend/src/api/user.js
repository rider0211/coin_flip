import express from "express";
import login from "./user-login.js";
import signup from "./user-signup.js";
import changePassword from "./user-change-password.js";
import auth from "../utils/auth.js";
import handleCoinToss from "./wager.js";
import recentWager from "./history.js";
import getTokenAmount from "./getTokenAmount.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/changePassword", auth, changePassword);
router.post("/wager", auth, handleCoinToss);
router.get("/recent-wagers", auth, recentWager);
router.get("/get-token-amount", auth, getTokenAmount);

export default router;
