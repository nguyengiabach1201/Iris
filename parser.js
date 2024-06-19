import { Tokens } from "./lexer.js";

export const Types = {
  Text: "Text",
  Section: "Section",
  Choice: "Choice",
  Diversion: "Diversion",
};

export class Text {
  constructor(content) {
    this.content = content;
  }
}

export class Choice {
  constructor(content, body) {
    this.content = content;
    this.body = body;
  }
}

export class Section {
  constructor(name, body) {
    this.name = name;
    this.body = body;
  }
}

export class Diversion {
  constructor(section) {
    this.section = section;
  }
}

export class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.ast = [];
    this.current = 0;
  }

  error(msg, line) {
    console.log(`Error: ${msg} at the starting of line ${line}`);
  }

  peek() {
    if (this.current >= this.tokens.length) return "\0";
    return this.tokens[this.current];
  }

  advance() {
    if (this.current >= this.tokens.length) return "\0";
    return this.tokens[this.current++];
  }

  textStatement(token, inline) {
    let content = token.content;

    while (this.peek().type === Tokens["Eol"] && !inline) {
      if (this.current + 1 < this.tokens.length) {
        this.advance();
        if (this.tokens[this.current].type === Tokens["Text"]) {
          content += " " + this.tokens[this.current].content;
          this.advance();
        }
      }
    }

    return new Text(content);
  }

  choiceStatement(token) {
    let content = "";
    let body = [];

    if (this.peek().type === Tokens["Text"]) {
      content = this.textStatement(this.advance(), true).content;
    } else
      this.error(`Expected 'Text' but got '${this.peek().type}'`, token.line);

    while (
      this.peek().type !== Tokens["Eof"] &&
      this.peek().type !== Tokens["Section"] &&
      this.peek().type !== Tokens["Choice"]
    ) {
      if (this.peek().type === Tokens["Text"]) {
        body.push(this.textStatement(this.advance(), false));
      } else if (this.peek().type === Tokens["Choice"]) {
        body.push(this.choiceStatement(this.advance()));
      } else if (this.peek().type === Tokens["Diversion"]) {
        body.push(this.diversionStatement(this.advance()));
      } else this.advance();
    }

    return new Choice(content, body);
  }

  sectionStatement(token) {
    let name = "";
    let body = [];

    if (this.peek().type === Tokens["Text"]) {
      name = this.textStatement(this.advance(), true).content;
    } else
      this.error(`Expected 'Text' but got '${this.peek().type}'`, token.line);

    while (
      this.peek().type !== Tokens["Eof"] &&
      this.peek().type !== Tokens["Section"]
    ) {
      if (this.peek().type === Tokens["Text"]) {
        body.push(this.textStatement(this.advance(), false));
      } else if (this.peek().type === Tokens["Choice"]) {
        body.push(this.choiceStatement(this.advance()));
      } else if (this.peek().type === Tokens["Diversion"]) {
        body.push(this.diversionStatement(this.advance()));
      } else this.advance();
    }

    return new Section(name, body);
  }

  diversionStatement(token) {
    if (this.peek().type === Tokens["Text"]) {
      return new Diversion(this.textStatement(this.advance(), true).content);
    } else
      this.error(`Expected 'Text' but got '${this.peek().type}'`, token.line);

    return new Diversion("");
  }

  parse() {
    while (this.peek().type !== Tokens["Eof"]) {
      let token = this.advance();

      switch (token.type) {
        case Tokens["Text"]: {
          this.ast.push(this.textStatement(token, false));
          break;
        }
        case Tokens["Choice"]: {
          this.ast.push(this.choiceStatement(token));
          break;
        }
        case Tokens["Section"]: {
          this.ast.push(this.sectionStatement(token));
          break;
        }
        case Tokens["Diversion"]: {
          this.ast.push(this.diversionStatement(token));
          break;
        }
        case Tokens["Eol"]: {
          break;
        }
        case Tokens["Eof"]: {
          break;
        }
      }
    }
    console.log(this.ast);
  }
}
