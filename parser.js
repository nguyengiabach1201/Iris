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

  textStatement(token) {
    return new Text(token.content);
  }

  choiceStatement(token) {
    let content = "";
    let body = [];
    
    if (this.peek().type === Tokens["Text"]) {
      content = this.textStatement(this.peek());
    } else this.error(`Expected 'Text' but got '${this.peek().type}'`, token.line);
    
    return new Choice(content, body);
  }

  parse() {
    while (this.peek().type !== Tokens["Eof"]) {
      let token = this.advance();

      switch (token.type) {
        case Tokens["Text"]: {
          this.ast.push(this.textStatement(token));
          break;
        }
        case Tokens["Choice"]: {
          this.ast.push(this.choiceStatement(token));
          break;
        }
        case Tokens["Section"]: {
          break;
        }
        case Tokens["Diversion"]: {
          break;
        }
        case Tokens["Eol"]: {
          break;
        }
        case Tokens["Eof"]: {
          break;
        }
      }

      // console.log(token.type);
    }
    console.log(this.ast);
  }
}
