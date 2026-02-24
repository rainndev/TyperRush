import { Stats } from "./Stats.js";
import { TextGenerator } from "./TextGenerator.js";
import { Timer } from "./Timer.js";
import { UI } from "./UI.js";

const MAX_WORDS = 20;

export class TypingTest {
  constructor() {
    this.timer = new Timer();
    this.textGenerator = new TextGenerator();
    this.stats = new Stats();
    this.ui = new UI();
    this.handleInputBound = (e) => this.handleInput(e.target.value);
    this.generatedText = this.textGenerator.generate(MAX_WORDS);
    this.timeInterval = null;
    this.isTestStarted = false;

    // Initial render and event listeners
    this.ui.renderText(this.generatedText);
    this.ui.input.addEventListener("input", this.handleInputBound);

    this.ui.restartButton.addEventListener("click", () => {
      console.log("Restart button clicked.");
      this.restart();
    });
  }

  start() {
    this.generatedText = this.textGenerator.generate(20);
    this.ui.renderText(this.generatedText);
    this.ui.input.addEventListener("input", this.handleInputBound);
  }

  handleElapsedTime() {
    if (this.timer.isStarted && !this.timeInterval) {
      this.timeInterval = setInterval(() => {
        const elapsedTime = this.timer.getElapsedTimeFormatted();
        this.ui.elapseTimeDisplay.textContent = elapsedTime;
      }, 100);
    }
  }

  handleBackspace(valueLength, textSpans) {
    const removedIndex = valueLength;

    if (removedIndex < 0) return; // No characters to remove

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

  handleInput(value) {
    const currentIndex = value.length - 1;

    if (!this.isTestStarted) {
      this.isTestStarted = true;
      this.timer.start();
      this.handleElapsedTime();
    }

    const textSpans = document
      .getElementById("text-display")
      .querySelectorAll("span");

    if (value.length < this.stats.totalTyped) {
      this.handleBackspace(value.length, textSpans);
      return;
    }

    this.ui.displayCurrentLetter(value[currentIndex] || "");

    if (currentIndex < 0 || currentIndex >= textSpans.length) {
      return;
    }

    const actualChar = textSpans[currentIndex].innerText;
    const typedChar = value[currentIndex];

    if (actualChar === typedChar) {
      this.ui.updateCharacter(currentIndex, "correct");
      this.stats.correct++;
    } else {
      this.ui.updateCharacter(currentIndex, "incorrect");
    }

    this.stats.totalTyped = value.length;

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

    clearInterval(this.timeInterval);
    this.timeInterval = null;
    this.timer.stop();
    this.ui.input.removeEventListener("input", this.handleInputBound);
  }

  reset() {
    this.stats = new Stats();
    this.ui.renderText("");
    this.timer.stop();
    this.isTestStarted = false;
    this.ui.timeDisplay.textContent = "0.000s";
  }

  restart() {
    this.ui.resultDiv.style.display = "none";
    this.ui.typingContainer.style.display = "flex";
    this.ui.elapseTimeDisplay.textContent = "0.000s";

    this.reset();
    this.start();
  }
}
