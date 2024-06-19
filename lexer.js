export const Tokens = {
  Content: "Content",
  Plus: "Plus",
  Minus: "Minus",
  Greater: "Greater",
  Eol: "Eol",
  Eof: "Eof",
};

export class Token {
  constructor(type, content) {
    this.type = type;
    this.content = content;
  }
}

export class Lexer {
  constructor(source = "") {
    this.source = source;
    this.tokens = [];
    this.current = 0;
  }

  peek() {
    if (this.current >= this.source.length) return "\0";
    return this.source[this.current];
  }

  advance() {
    if (this.current >= this.source.length) return "\0";
    return this.source[this.current++];
  }

  scan() {
    const content = (char) => {
      let result = char; // Starting char
      while (this.peek() !== "\0" && this.peek() !== "\n") {
        result += this.advance();
      }
      return result;
    };

    while (this.peek() !== "\0") {
      let char = this.advance();

      switch (char) {
        case "\n": {
          this.tokens.push(new Token(Tokens["Eol"], "\n"));
          break;
        }
        case " ":
          break;
        case "\t":
          break;
        case "#": {
          while (this.peek() !== "\n" && this.peek() !== "\0") {
            this.advance();
          }
          break;
        }
        case "+": {
          this.tokens.push(new Token(Tokens["Plus"], "+"));
          break;
        }
        case "-": {
          this.tokens.push(new Token(Tokens["Minus"], "-"));
          break;
        }
        case ">": {
          this.tokens.push(new Token(Tokens["Greater"], ">"));
          break;
        }
        default: {
          let c = content(char);
          this.tokens.push(new Token(Tokens["Content"], c));
        }
      }
    }

    this.tokens.push(new Token(Tokens["Eof"], "\0"));
  }
}
