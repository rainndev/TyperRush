//FOMULA WPM = (Total Characters Typed / 5) / (Time in Minutes)
//FOMULA Accuracy = (Correct Characters / Total Characters Typed) * 100

export class Stats {
  constructor() {
    this.correct = 0;
    this.totalTyped = 0;
  }

  calculateCPM(timeInSeconds) {
    const minutes = timeInSeconds / 60;
    if (minutes <= 0) return 0;

    return Math.round(this.totalTyped / minutes);
  }

  calculateAccuracy() {
    if (this.totalTyped === 0) return 0;
    return Math.round((this.correct / this.totalTyped) * 100);
  }
}
