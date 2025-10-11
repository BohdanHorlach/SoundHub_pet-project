class PeriodicCleaner {
  intervalMs;
  intervalId;

  /**
   * @param {number} intervalMs - cleaning interval in milliseconds
   */
  constructor(intervalMs = 10 * 60 * 1000) {
    this.intervalMs = intervalMs;
    this.intervalId = null;
  }


  async clean() {
    throw new Error("The clean() method must be implemented in the descendant class.");
  }


  start() {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      this.clean().catch(err => console.error('PeriodicCleaner error:', err));
    }, this.intervalMs);

    console.log(`PeriodicCleaner started. Interval: ${this.intervalMs}ms`);
  }


  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("PeriodicCleaner stopped.");
    }
  }
}

module.exports = PeriodicCleaner;
