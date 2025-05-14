const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  type: { type: String, enum: ["Full-time", "Part-time"], required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    public_id: { type: String },
    url: { type: String },
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", jobSchema);
