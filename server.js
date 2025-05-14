const express = require("express");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cloudinary = require('cloudinary').v2

dotenv.config();
connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
})

const app = express();
// app.use(cors());
app.use(cors({
    origin: ['https://knovator-frontend.vercel.app'],
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
exports.upload = multer({ storage });

const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
