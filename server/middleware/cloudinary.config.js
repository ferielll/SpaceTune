const multer = require("multer");

const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "spacetune",
  api_key: "146545756483629",
  api_secret: "tCqA4fAcZbekOr9LRd8mPtestHc",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "spacetune_training",
    allowedFormats: ["jpg", "png", "pdf"],
    public_id: (req, file) => file.filename,
  },
});

const parser = multer({ storage: storage });

module.exports = parser;
