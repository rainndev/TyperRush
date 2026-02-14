export class UI {
  constructor() {
    this.textDisplay = document.getElementById("text-display");
    this.input = document.getElementById("input-words");
    this.textDisplayWords = document.getElementById("text-display-words");
    this.wpmDisplay = document.getElementById("wpm-display");
    this.accuracyDisplay = document.getElementById("accuracy-display");
    this.timeDisplay = document.getElementById("time-display");
    this.correctCharsDisplay = document.getElementById("correct-chars-display");
    this.resultDiv = document.getElementById("result");
    this.typingContainer = document.getElementById("typing-container");
    this.restartButton = document.getElementById("restart-button");
    this.elapseTimeDisplay = document.getElementById("elapse-time-display");
    this.capsLockToggle = document.getElementById("caps-lock-toggle");

    //focus input when text display is clicked
    this.restart = this.textDisplay.addEventListener("click", () => {
      this.input.focus();
    });

    document.addEventListener("keyup", (e) => {
      const isCapsLockOn = e.getModifierState("CapsLock");

      if (isCapsLockOn) {
        console.log("Caps Lock is ON");
        this.capsLockToggle.classList.add("caps-lock-on");
        this.capsLockToggle.classList.remove("caps-lock-off");
      } else {
        console.log("Caps Lock is OFF");
        this.capsLockToggle.classList.remove("caps-lock-on");
        this.capsLockToggle.classList.add("caps-lock-off");
      }
    });
  }

  renderText(text) {
    this.textDisplay.innerHTML = "";
    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.innerText = char;
      this.textDisplay.appendChild(span);
    });
    this.input.value = "";
  }

  updateCharacter(index, status) {
    const charSpan = this.textDisplay.children[index];

    if (!charSpan) return;

    if (!status) {
      charSpan.classList.remove("correct");
      charSpan.classList.remove("incorrect");
      return;
    }

    charSpan.classList.add(status);
  }

  showStats(wpm, accuracy, generatedText, correctChars, time) {
    this.textDisplayWords.innerText = generatedText;
    this.wpmDisplay.innerText = wpm;
    this.accuracyDisplay.innerText = `${accuracy}%`;
    this.correctCharsDisplay.innerText = `${correctChars}`;
    this.timeDisplay.innerText = `${time.toFixed(2)}s`;

    this.resultDiv.style.display = "flex";
    this.typingContainer.style.display = "none";
  }
}
