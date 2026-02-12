import tagalogWords from "../data/tagalog.json" with { type: "json" };

export class TextGenerator {
  constructor() {
    this.words = tagalogWords;
  }

  generate(count) {
    return Array.from({ length: count }, () => {
      const randomIndex = Math.floor(Math.random() * this.words.length);
      return this.words[randomIndex];
    }).join(" ");
  }
}
