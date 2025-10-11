const path = require('path');
const TempFileCleaner = require('../utils/cleaning/temp-file-cleaner');
const RejectedCardCleaner = require('../utils/cleaning/rejected-cards-cleaner');

const TEMP_FILES_CLEAN_DELAY = 10 * 60 * 1000; //every 10 minutes
const REJECTED_CARD_CLEAN_DELAY = 2 * 60 * 60 * 1000; //every 2 hours

const uploadPath = path.resolve(__dirname, "../uploads");
const convertedPath = path.resolve(__dirname, "../converted");
console.log(`Converted path: ${convertedPath},\nUpload path: ${uploadPath}`);

const tempFileCleaner = new TempFileCleaner([uploadPath, convertedPath], TEMP_FILES_CLEAN_DELAY);
const rejectedCardsCleaner = new RejectedCardCleaner(REJECTED_CARD_CLEAN_DELAY); 

module.exports = { tempFileCleaner, rejectedCardsCleaner, uploadPath, convertedPath };
