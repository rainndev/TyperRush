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

    //focus input when text display is clicked
    this.ui.textDisplay.addEventListener("click", () => {
      this.ui.input.focus();
    });

    this.generatedText = this.textGenerator.generate(5);
  }

  start() {
    const text = this.generatedText;
    this.ui.renderText(text);
    this.timer.start();
    this.ui.input.addEventListener("input", (e) =>
      this.handleInput(e.target.value),
    );
  }

  handleInput(value) {
    const textSpans = this.ui.textDisplay.querySelectorAll("span");
    const currentIndex = value.length - 1;

    // Backspace case
    if (value.length < this.stats.totalTyped) {
      const removedIndex = this.stats.totalTyped - 1;

      if (textSpans[removedIndex].classList.contains("correct")) {
        this.stats.correct--;
      }

      this.ui.updateCharacter(removedIndex, null);
      this.stats.totalTyped--;
      return;
    }

    // Prevent out of bounds
    if (currentIndex < 0 || currentIndex >= textSpans.length) return;

    const typedChar = value[currentIndex];
    const actualChar = textSpans[currentIndex].innerText;

    if (typedChar === actualChar) {
      this.ui.updateCharacter(currentIndex, "correct");
      this.stats.correct++;
    } else {
      this.ui.updateCharacter(currentIndex, "incorrect");
    }

    this.stats.totalTyped++;

    if (value.length === textSpans.length) {
      this.finish();
    }
  }

  finish() {
    const timeInSeconds = this.timer.getElapsedTime();
    const generatedText = this.generatedText;
    const correctChars = `${this.stats.correct}/${this.stats.totalTyped}`;

    console.log("Test finished in seconds:", timeInSeconds);
    const wpm = this.stats.calculateWPM(timeInSeconds);
    console.log("Calculated WPM:", wpm);
    const accuracy = this.stats.calculateAccuracy();

    this.ui.showStats(
      wpm,
      accuracy,
      generatedText,
      correctChars,
      timeInSeconds,
    );

    this.timer.stop();
  }

  reset() {
    this.stats = new Stats();
    this.ui.renderText("");
    this.timer.stop();
  }
}
