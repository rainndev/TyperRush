import { Stats } from "./Stats.js";
import { TextGenerator } from "./TextGenerator.js";
import { Timer } from "./Timer.js";
import { UI } from "./UI.js";

export class TypingTest {
  constructor() {
    this.timer = new Timer();
    this.textGenerator = new TextGenerator();
    this.stats = new Stats();
    this.ui = new UI();
  }

  start() {
    const text = this.textGenerator.generate(50);
    this.ui.renderText(text);
    this.timer.start();
    this.ui.input.addEventListener("input", (e) =>
      this.handleInput(e.target.value),
    );
  }

  handleInput(value) {
    this.stats.correct = 0;
    this.stats.totalTyped = 0;

    const textSpans = this.ui.textDisplay.querySelectorAll("span");
    console.log("textSpans:", textSpans);
    const length = value.length;

    textSpans.forEach((span, index) => {
      const char = value[index];
      const status =
        char == null ? null : char === span.innerText ? "correct" : "incorrect";
      this.ui.updateCharacter(index, status);
      this.stats.totalTyped++;

      if (status === "correct") {
        this.stats.correct++;
      }
    });
    if (length === textSpans.length) {
      this.finish();
    }
  }

  finish() {
    const timeInSeconds = this.timer.getElapsedTime();
    console.log("Test finished in seconds:", timeInSeconds);
    const wpm = this.stats.calculateWPM(timeInSeconds);
    console.log("Calculated WPM:", wpm);
    const accuracy = this.stats.calculateAccuracy();
    this.ui.showStats(wpm, accuracy);
    this.timer.stop();
  }
  reset() {
    this.stats = new Stats();
    this.ui.renderText("");
    this.timer.stop();
  }
}
