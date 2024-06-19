import { Types } from "./parser.js";

export class CodeGen {
  constructor(ast) {
    this.ast = ast;
    // this.html = "";
    this.js = "let text = console.log;";
    this.current = 0;
  }

  push(node) {
    if (node.type === Types["Section"]) {
      this.js += `function ${node.name}(){`;
      node.body.forEach((child) => {
        this.push(child);
      });
      this.js += `}`;
    } else if (node.type === Types["Text"]) {
      this.js += `text("${node.content}");`;
    } else if (node.type === Types["Choice"]) {
    } else if (node.type === Types["Diversion"]) {
      this.js += `if(${node.section}){${node.section}();}else{console.error('Error: Section ${node.section} is undefined')}`;
    }
  }

  generate() {
    let i = 0;
    this.ast.forEach((node) => {
      // console.log(node);
      this.push(node);
      i++;
    });
    console.log(this.js);
  }
}
