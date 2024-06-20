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

  push(node, list) {
    if (node.type === Types["Section"]) {
      this.jsList.push(`function ${node.name}(){`);
      node.body.forEach((child) => {
        this.push(child);
      });
      this.jsList.push(`}`);
    } else if (node.type === Types["Text"]) {
      this.jsList.push(`text("${node.content}");`);
    } else if (node.type === Types["Choice"]) {
      let choiceList = [];
      node.body.forEach((child) => {
        choiceList.push(this.push(child));
      });
      node.body = choiceList;
      console.log(choiceList);
      this.jsList.push(`choice("${node.content}");`);
    } else if (node.type === Types["Diversion"]) {
      this.jsList.push(
        `if(${node.section}){return ${node.section}();}else{console.error('Error: Section ${node.section} is undefined')}`,
      );
    }
  }

  analise(list) {
    for (let i = list.length - 1; i >= 0; i -= 1) {
      if (list[i - 1] && list[i - 1].startsWith("text") && list[i] != "}") {
        list[i - 1] =
          list[i - 1].substr(0, list[i - 1].length - 2) +
          `,()=>{ ${list[i]} }` +
          list[i - 1].substr(list[i - 1].length - 2);
        list[i] = "";
      }
    }
  }

  generate() {
    this.ast.forEach((node) => {
      this.push(node, this.jsList);
    });

    this.analise(this.jsList);

    this.jsList.forEach((node) => {
      this.js += node;
    });

    this.js = "(()=>{" + this.js;
    this.js += "})();";
    console.log(this.js, "\n");
  }
}
