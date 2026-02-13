export class Timer {
  constructor(duration) {
    this.duration = duration;
    this.startTime = null;
    this.isStarted = false;
  }

  start() {
    console.log("Timer started.");
    this.startTime = Date.now();
    this.isStarted = true;
  }
  getElapsedTime() {
    if (this.startTime == null) return 0;
    //convert ms to seconds
    return (Date.now() - this.startTime) / 1000;
  }

  getElapsedTimeFormatted() {
    if (this.startTime == null) return 0;
    const elapsed = Date.now() - this.startTime;
    const seconds = (elapsed / 1000).toFixed(3);
    return `${seconds}s`;
  }

  stop() {
    console.log("Timer stopped at:", this.getElapsedTime(), "seconds");
    this.isStarted = false;
    this.startTime = null;
  }
}
