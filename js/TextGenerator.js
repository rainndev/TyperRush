import tagalogWords from "../data/tagalog.json" with { type: "json" };

export class TextGenerator {
  constructor() {
    this.words = tagalogWords;
  }

  generate(count) {
    return this.words.slice(0, count).join(" ");
  }
}
