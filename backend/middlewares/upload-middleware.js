const multer = require("multer");
const { BadRequest } = require("../exceptions/api-errors");
const { uploadPath } = require("../config/temp-file-cleaner-config");

const ALLOWED_TYPES = [
  "audio/mpeg",
  "audio/wav",
  "audio/x-m4a",
  "audio/aac",
];

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const UPLOADS_DIR = uploadPath;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname;
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${originalname}`;
    cb(null, uniqueName);
  },
});


const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new BadRequest("File type not allowed. Only audio files are allowed: mp3, wav, m4a, aac"));
  }
};


const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});


module.exports = upload;