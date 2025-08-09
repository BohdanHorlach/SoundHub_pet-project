const fs = require("fs");
const path = require("path");

class TempFileCleaner {
  folders;
  intervalMs;
  intervalId;

  /**
   * @param {string[]} folders - absolute folder paths
   * @param {number} intervalMs - cleaning interval in milliseconds
   */
  constructor(folders = [], intervalMs = 10 * 60 * 1000) {
    this.folders = folders;
    this.intervalMs = intervalMs;
    this.intervalId = null;
  }


  start() {
    if (this.intervalId)
      return; 

    this.intervalId = setInterval(() => {
      this.clean();
    }, this.intervalMs);

    console.log(`TempFileCleaner started. Interval: ${this.intervalMs}ms`);
  }


  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("TempFileCleaner stopped.");
    }
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
