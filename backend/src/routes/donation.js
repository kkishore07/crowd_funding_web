const express = require("express");
const { createDonation, getMyDonations } = require("../controller/donationController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, createDonation);
router.get("/user/my-donations", verifyToken, getMyDonations);

module.exports = router;
