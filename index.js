import { Lexer } from "./lexer.js";

export class Iris {
  constructor(src) {
    this.src = src;
    this.tokens = [];
    this.html = "";

    this.lexer(this.src);
  }

  lexer() {
    const lexer = new Lexer(this.src);
    lexer.scan();
    this.tokens = lexer.tokens;
  }
}

const src = `
- Hi
hello 1, 2, 3
+ Hello`;

const iris = new Iris(src);
console.log(iris);
