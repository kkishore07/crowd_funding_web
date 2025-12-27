const Donation = require("../models/donation");
const Campaign = require("../models/campaign");

const createDonation = async (req, res) => {
  try {
    const { campaignId, amount } = req.body;
    if (!campaignId || !amount || amount <= 0) {
      return res.status(400).json({ message: "Campaign and amount required" });
    }

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });
    if (campaign.status !== "approved") return res.status(400).json({ message: "Campaign not active" });

    const donation = await Donation.create({
      donor: req.user.id,
      donorName: req.user.email,
      campaign: campaignId,
      amount,
    });

    campaign.currentAmount += amount;
    await campaign.save();

    res.status(201).json({ message: "Donation successful", donation });
  } catch (err) {
    res.status(400).json({ message: "Donation failed", error: err.message });
  }
};

const getMyDonations = async (req, res) => {
  try {
    console.log("getMyDonations called with user:", req.user);
    
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    
    const donations = await Donation.find({ donor: req.user.id })
      .populate({
        path: "campaign",
        select: "title description targetAmount currentAmount status"
      })
      .sort({ createdAt: -1 })
      .lean();
    
    // Filter out donations where campaign no longer exists
    const validDonations = donations.filter(donation => donation.campaign !== null);
    
    console.log(`Found ${validDonations.length} donations for user ${req.user.id}`);
    res.status(200).json({ donations: validDonations });
  } catch (err) {
    console.error("Error in getMyDonations:", err);
    console.error("Error stack:", err.stack);
    res.status(500).json({ message: "Failed to fetch donations", error: err.message });
  }
};

module.exports = { createDonation, getMyDonations };
