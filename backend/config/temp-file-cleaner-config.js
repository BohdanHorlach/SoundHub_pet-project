const path = require('path');
const TempFileCleaner = require('../utils/temp-file-cleaner');

const uploadPath = path.resolve(__dirname, "../uploads");
const convertedPath = path.resolve(__dirname, "../converted");
console.log(`Converted path: ${convertedPath},\nUpload path: ${uploadPath}`);
const tempFileCleaner = new TempFileCleaner([uploadPath, convertedPath], 10 * 60 * 1000); //every 10 minutes

module.exports = { tempFileCleaner, uploadPath, convertedPath };
