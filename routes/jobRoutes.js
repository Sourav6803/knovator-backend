const express = require("express");
const {
  getJobs,
  getJobById,
  createJob,
} = require("../controllers/jobController");
const { upload } = require("../server");

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/createJob", upload.single('image'), createJob);

module.exports = router;
