const mongoose = require('mongoose');

const travelTalesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    story: { type: String, required: true },
    imageUrl: { type: String, required: true },
    visitedLocation: { type: [String], default: [] },
    isfavourite: { type: Boolean, default: false },
    // userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    visitedDate: { type: Date, required: true }
})

module.exports = mongoose.model("TravelTales", travelTalesSchema);