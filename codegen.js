import { Types } from "./parser.js";

export class CodeGen {
  constructor(ast) {
    this.ast = ast;

    this.css = `#container,#container>button,#container>button:hover{font-family:"Special Elite",system-ui}body{width:100vw;height:100vh;overflow-x:hidden;margin:5rem 10rem}#container{width:calc(100vw - 20rem);font-size:20px}#container>*{margin-top:0;margin-bottom:7px}#container>button{width:100%;border:none;background:0 0;color:#414141;font-size:15px;animation:.6s cubic-bezier(.38,.97,.56,.76) .1s forwards show;opacity:0;transform:rotateX(-90deg);transform-origin:top center}#container>button:hover{color:#4b4b4b;font-size:18px}@keyframes show{100%{opacity:1;transform:none}}`;
    this.js = "";

    this.jsList = [];

    this.current = 0;
  }

  push(node, list) {
    if (node.type === Types["Section"]) {
      list.push(`function ${node.name}(){`);
      node.body.forEach((child) => {
        this.push(child, list);
      });
      list.push(`}`);
    } else if (node.type === Types["Text"]) {
      list.push(`return text("${node.content}");`);
    } else if (node.type === Types["Choice"]) {
      let choiceList = [];
      node.body.forEach((child) => {
        this.push(child, choiceList);
      });
      node.body = choiceList;
      this.analise(node.body);
      list.push(`choice("${node.content}",()=>{${node.body}});`);
    } else if (node.type === Types["Diversion"]) {
      list.push(
        `if(${node.section}){return diversion(${node.section});}else{console.error('Error: Section ${node.section} is undefined')}`,
      );
    }
  }

  analise(list) {
    for (let i = list.length - 1; i >= 0; i -= 1) {
      if (
        list[i - 1] &&
        list[i - 1].startsWith("choice") &&
        list[i].startsWith("choice")
      ) {
        list[i - 1] =
          list[i - 1].substr(0, list[i - 1].length - 2) +
          `,()=>{${list[i]}}` +
          list[i - 1].substr(list[i - 1].length - 2);
        list[i] = "";
      }

      if (list[i - 1] && list[i - 1].startsWith("return text") && list[i] != "}") {
        list[i - 1] =
          list[i - 1].substr(0, list[i - 1].length - 2) +
          `,()=>{${list[i]}}` +
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

    this.js =
      `const container=document.getElementById("container");function typeWriter(n,e,t){let r=[n];var i,o=0,c=r[0].length,a=0,l="";!function n(){l=" ",i=Math.max(0,o-20);for(var p=e;i<o;)l+=r[i++]+"<br />";p.innerHTML=l+r[o].substring(0,a)+"_",a++==c?(a=0,++o!=r.length?(c=r[o].length,setTimeout(n,500)):(p.innerHTML=l+r[o-1].substring(0,c),t&&t())):setTimeout(n,50)}()}function br(){let n=document.createElement("br");container.appendChild(n)}function text(n,e){let t=document.createElement("p");container.appendChild(t),typeWriter(n,t,e)}function choice(n,e,t){let r=document.createElement("button");r.innerHTML=n,r.onclick=()=>{Array.prototype.slice.call(container.getElementsByTagName("button"),0).forEach(n=>{n.remove()}),br(),text(n,()=>{br(),e()})},container.appendChild(r),t&&t()}function diversion(n){n&&n()}function end(){throw text("--- The End ---"),"Thanks for playing!!!"}` +
      "(()=>{" +
      this.js;
    this.js += "})()";

    this.html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Iris</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet"><style>${this.css}</style></head><body><div id="container"></div><script>${this.js}</script></body></html>`;
    console.log(this.html, "\n");
  }
}
