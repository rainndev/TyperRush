export class Stats {
  constructor() {
    this.correct = 0;
    this.totalTyped = 0;
  }

  calculateWPM(timeInSeconds) {
    const wordsTyped = this.totalTyped / 5;
    const minutes = timeInSeconds / 60;
    return Math.round(wordsTyped / minutes);
  }
  calculateAccuracy() {
    if (this.totalTyped === 0) return 0;
    return Math.round((this.correct / this.totalTyped) * 100);
  }
}
