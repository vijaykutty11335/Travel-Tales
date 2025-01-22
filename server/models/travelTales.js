const mongoose = require('mongoose');

const travelTalesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    tale: { type: String, required: true },
    imageUrl: { type: String, required: true },
    visitedLocations: { type: [String], default: [] },
    isFav: { type: Boolean, default: false },
    visitedDate: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

module.exports = mongoose.model("TravelTales", travelTalesSchema);