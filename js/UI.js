export class UI {
  constructor() {
    this.textDisplay = document.getElementById("text-display");
    this.input = document.getElementById("input");
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
    if (status === "correct") {
      charSpan.classList.add("correct");
      charSpan.classList.remove("incorrect");
    } else if (status === "incorrect") {
      charSpan.classList.add("incorrect");
      charSpan.classList.remove("correct");
    } else {
      charSpan.classList.remove("correct");
      charSpan.classList.remove("incorrect");
    }
  }
  showStats(wpm, accuracy) {
    alert(`WPM: ${wpm}\nAccuracy: ${accuracy}%`);
  }
}
