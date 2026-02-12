export class Timer {
  constructor(duration) {
    this.duration = duration;
    this.startTime = null;
  }

  start() {
    this.startTime = Date.now();
  }
  getElapsedTime() {
    if (this.startTime == null) return 0;
    return (Date.now() - this.startTime) / 1000;
  }
  stop() {
    this.startTime = null;
  }
}
