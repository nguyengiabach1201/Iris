export class CodeGen {
  constructor(ast) {
    this.ast = ast;

    this.css = `#container,#container>button,#container>button:hover{font-family:"Special Elite",system-ui}body{width:100vw;height:100vh;overflow-x:hidden;margin:5rem 10rem}#container{width:calc(100vw - 20rem);font-size:20px}#container>*{margin-top:0;margin-bottom:7px}#container>button{width:100%;border:none;background:0 0;color:#414141;font-size:15px;animation:.6s cubic-bezier(.38,.97,.56,.76) .1s forwards show;opacity:0;transform:rotateX(-90deg);transform-origin:top center}#container>button:hover{color:#4b4b4b;font-size:18px}@keyframes show{100%{opacity:1;transform:none}}`;
    this.js =
      `const ast=` +
      JSON.stringify(this.ast, null, 0) +
      `const container=document.getElementById("container");function br(){let e=document.createElement("br");container.appendChild(e)}function text(e,n,t){let r=document.createElement("p");t&&(r.style.color=t),container.appendChild(r);let i=[e];var o,c=0,l=i[0].length,a=0,s="";!function e(){s=" ",o=Math.max(0,c-20);for(var t=r;o<c;)s+=i[o++]+"<br />";if(t.innerHTML=s+i[c].substring(0,a)+"_",a++==l){if(a=0,++c!=i.length)l=i[c].length,setTimeout(e,500);else{t.innerHTML=s+i[c-1].substring(0,l),n&&n();return}}else setTimeout(e,50)}()}function choice(e,n,t){let r=document.createElement("button");r.innerHTML=e,r.onclick=()=>{Array.prototype.slice.call(container.getElementsByTagName("button"),0).forEach(e=>{e.remove()}),br(),text(e,()=>{br(),n()},"gray")},container.appendChild(r),t&&t()}function diversion(e){e&&e()}function end(){throw text("--- The End ---"),"Thanks for playing!!!"}`;
    this.html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Iris</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet"><style>${this.css}</style></head><body><div id="container"></div><script>${this.js}</script></body></html>`;
  }
}
