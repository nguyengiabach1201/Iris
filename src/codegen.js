import { Types } from "./parser.js";

export class CodeGen {
  constructor(ast) {
    this.ast = ast;

    this.css = `#container,#container>button,#container>button:hover{font-family:"Special Elite",system-ui}body{width:100vw;height:100vh;overflow-x:hidden;margin:5rem 10rem}#container{width:calc(100vw - 20rem);font-size:20px}#container>*{margin-top:0;margin-bottom:7px}#container>button{width:100%;border:none;background:0 0;color:#414141;font-size:15px}#container>button,p{animation:.6s cubic-bezier(.38,.97,.56,.76) .1s forwards show;opacity:0;transform:rotateX(-90deg);transform-origin:top center}#container>.answered{color:gray;margin-top:10px;margin-bottom:10px}#container>button:hover{color:#4b4b4b;font-size:18px}@keyframes show{100%{opacity:1;transform:none}}`;
    this.js = `window.container=document.getElementById("container"),window.text=e=>{let n=document.createElement("p");n.innerHTML=e,container.appendChild(n)},window.choice=(e,n)=>{let t=document.createElement("button");t.innerHTML=e,t.onclick=()=>{Array.prototype.slice.call(container.getElementsByTagName("button"),0).forEach(e=>{e.remove()});let e=document.createElement("p");e.innerHTML=t.innerHTML,e.class="answered",n()},container.appendChild(t)},window.diversion=e=>{e&&e()},window.end=()=>{throw window.text("--- The End ---"),"Thanks for playing!!!"};`;

    this.jsList = [];
  }

  push(node, list) {
    if (node.type === Types["Section"]) {
      list.push(`function ${node.name}(){`);
      node.body.forEach((child) => {
        this.push(child, list);
      });
      list.push(`}`);
    } else if (node.type === Types["Text"]) {
      list.push(`text(\`${node.content}\`);`);
    } else if (node.type === Types["Choice"]) {
      let choiceList = [];
      node.body.forEach((child) => {
        this.push(child, choiceList);
      });
      node.body = choiceList;
      list.push(`choice(\`${node.content}\`,()=>{${node.body}});`);
    } else if (node.type === Types["Diversion"]) {
      list.push(
        `if(${node.section}){diversion(${node.section});}else{console.error('Error: Section ${node.section} is undefined')}`,
      );
    } else if (node.type === Types["Var"]) {
      list.push(
        `try{${node.name} = ${node.value}}catch{'Error: Struggling with variable ${node.name}'}`,
      );
    } else if (node.type === Types["If"]) {
      list.push(`if(${node.condition}){`);
      node.body.forEach((child) => {
        this.push(child, list);
      });
      list.push(`}`);
    }
  }

  generate() {
    this.ast.forEach((node) => {
      this.push(node, this.jsList);
    });

    this.js += "(()=>{";

    this.jsList.forEach((node) => {
      this.js += node;
    });

    this.js += "})()";

    this.html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Iris</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet"><style>${this.css}</style></head><body><div id="container"></div><script>${this.js}</script></body></html>`;
  }
}
