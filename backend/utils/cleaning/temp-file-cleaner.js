const fs = require("fs");
const path = require("path");
const PeriodicCleaner = require("./periodic-cleaner");


class TempFileCleaner extends PeriodicCleaner {
  folders;

  /** 
   * @param {string[]} folders - absolute folder paths 
   * @param {number} intervalMs - cleaning interval in milliseconds 
  */
  constructor(folders = [], intervalMs) {
    super(intervalMs);
    this.folders = folders;
  }


  async clean() {
    for (const folder of this.folders) {
      try {
        const files = await fs.promises.readdir(folder);

        for (const file of files) {
          const filePath = path.join(folder, file);
          try {
            await fs.promises.unlink(filePath);
            console.log(`Deleted temp file: ${filePath}`);
          } catch (err) {
            console.warn(`Failed to delete file ${filePath}:`, err.message);
          }
        }
      } catch (err) {
        console.error(`Failed to read folder ${folder}:`, err.message);
      }
    }
  }
}


module.exports = TempFileCleaner;
