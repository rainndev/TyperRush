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
    this.handleInputBound = (e) => this.handleInput(e.target.value);
    this.generatedText = this.textGenerator.generate(20);

    //focus input when text display is clicked
    this.ui.textDisplay.addEventListener("click", () => {
      this.ui.input.focus();
    });

    this.ui.restartButton.addEventListener("click", () => {
      console.log("Restart button clicked.");
      this.restart();
    });
  }

  start() {
    const text = this.generatedText;
    this.ui.renderText(text);
    this.timer.start();
    this.ui.input.addEventListener("input", this.handleInputBound);
  }

  handleInput(value) {
    const textSpans = this.ui.textDisplay.querySelectorAll("span");
    const currentIndex = value.length - 1;

    // Backspace case
    if (value.length < this.stats.totalTyped) {
      if (this.stats.totalTyped <= 0) return; // No characters to remove
      const removedIndex = this.stats.totalTyped - 1;

      if (
        textSpans[removedIndex] &&
        textSpans[removedIndex].classList.contains("correct")
      ) {
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

    console.log("Typed char:", typedChar, "Actual char:", actualChar);

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
    console.log("Calculated Wpm:", wpm);
    const accuracy = this.stats.calculateAccuracy();

    this.ui.showStats(
      wpm,
      accuracy,
      generatedText,
      correctChars,
      timeInSeconds,
    );

    this.timer.stop();
    this.ui.input.removeEventListener("input", this.handleInputBound);
  }

  reset() {
    this.stats = new Stats();
    this.ui.renderText("");
    this.timer.stop();
  }

  restart() {
    this.ui.resultContainer.style.display = "none";
    this.ui.resultHeader.style.display = "none";
    this.ui.restartButton.style.display = "none";
    this.ui.typingContainer.style.display = "flex";

    this.reset();
    this.generatedText = this.textGenerator.generate(20);
    this.start();
  }
}
