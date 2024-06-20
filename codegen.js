import { Types } from "./parser.js";

export class CodeGen {
  constructor(ast) {
    this.ast = ast;
    this.html = "";
    this.css = "";
    this.js = "";

    this.jsList = [];

    this.current = 0;
  }

  push(node) {
    if (node.type === Types["Section"]) {
      this.jsList.push(`function ${node.name}(){`);
      node.body.forEach((child) => {
        this.push(child);
      });
      this.jsList.push(`}`);
    } else if (node.type === Types["Text"]) {
      this.jsList.push(`text("${node.content}");`);
    } else if (node.type === Types["Choice"]) {
    } else if (node.type === Types["Diversion"]) {
      this.jsList.push(
        `if(${node.section}){return ${node.section}();}else{console.error('Error: Section ${node.section} is undefined')}`,
      );
    }
  }

  generate() {
    this.ast.forEach((node) => {
      this.push(node);
    });

    for (let i = this.jsList.length - 1; i >= 0; i -= 1) {
      if (
        this.jsList[i - 1] &&
        this.jsList[i - 1].startsWith("text") &&
        this.jsList[i] != "}"
      ) {
        this.jsList[i - 1] =
          this.jsList[i - 1].substr(0, this.jsList[i - 1].length - 2) +
          `,()=>{ ${this.jsList[i]} }` +
          this.jsList[i - 1].substr(this.jsList[i - 1].length - 2);
        this.jsList[i] = "";
      }
    }

    this.jsList.forEach((node) => {
      this.js += node;
    });

    this.js = "(()=>{" + this.js;
    this.js += "})();";
    console.log(this.js, "\n");
  }
}
