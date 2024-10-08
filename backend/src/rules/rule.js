const changeDesc = require("./changeDesc");

class Rule {
  constructor(id, description, func, difficultyLevels) {
    this.id = id;
    this.description = description;
    this.func = func;
    this.difficultyLevels = difficultyLevels;
  }

  check(text, cek, difficulty) {
    if (this.difficultyLevels === null) {
      return this.func(text, cek);
    }
    return this.func(text, cek, this.difficultyLevels[difficulty]);
  }

  getDesc(difficulty) {
    let temp = this.description;
    if (difficulty != "" && this.difficultyLevels != null) {
      if (this.difficultyLevels[difficulty].Y) {
        temp = changeDesc(
          temp,
          "Z",
          this.difficultyLevels[difficulty].Y.toString()
        );
      }
      temp = changeDesc(
        temp,
        "X",
        this.difficultyLevels[difficulty].X.toString()
      );
    }
    return temp;
  }
}

module.exports = Rule;
