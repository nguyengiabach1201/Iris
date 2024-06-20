import { Lexer } from "./lexer.js";
import { Parser } from "./parser.js";
import { CodeGen } from "./codegen.js";

export class Iris {
  constructor(src) {
    this.src = src;
  }

  run() {
    const lexer = new Lexer(this.src);
    lexer.scan();

    const parser = new Parser(lexer.tokens);
    parser.parse();

    const codegen = new CodeGen(parser.ast);
    if (!parser.errored) {
      codegen.generate();
    }

    // eval(codegen.js);
  }
}

const src = `
> Hi
- Hi
hello 1, 2, 3
Hello
Test
> end
+ Hello
> Test
+Test
#+ +
-Test
Ok, test
Very well!

Hello
- None`;

// const test = `
// Hi
// Hello
// + Hello
// + Test
// > Hi

// - Hi
// 1 2 3

// 4

// `

const iris = new Iris(src);
iris.run();
