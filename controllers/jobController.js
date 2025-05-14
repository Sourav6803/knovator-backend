const Job = require("../models/jobModel");
const cloudinary = require("cloudinary").v2;

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

// @desc    Get job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch job" });
  }
};

// @desc    Create a new job
exports.createJob = async (req, res) => {
  try {
  
    const { title, company, type, location, description } = req.body;

    if (!title || !company || !type || !location || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const imageFile = req.file;
    
    if (!imageFile) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "jobImage" }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        })
        .end(imageFile.buffer);
    });

    const job = new Job({
      title,
      company,
      type,
      location,
      description,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
   
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Failed to create job" });
  }
};
