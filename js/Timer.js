export class Timer {
  constructor(duration) {
    this.duration = duration;
    this.startTime = null;
  }

  start() {
    console.log("Timer started.");
    this.startTime = Date.now();
  }
  getElapsedTime() {
    if (this.startTime == null) return 0;
    //convert ms to seconds
    return (Date.now() - this.startTime) / 1000;
  }
  stop() {
    console.log("Timer stopped at:", this.getElapsedTime(), "seconds");
    this.startTime = null;
  }
}
