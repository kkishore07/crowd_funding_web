const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  donorName: { type: String, required: true },
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: "campaigns", required: true },
  amount: { type: Number, required: true, min: 1 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("donations", donationSchema);
