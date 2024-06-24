window.container = document.getElementById("container");

window.text = (content, func) => {
    const p = document.createElement("p");
    container.appendChild(p);

    // Typewriting effect
    const textArray = [content];

    const typingSpeed = 50;
    var currentArrayIndex = 0;
    var currentTextLength = textArray[0].length;
    const scrollStartLine = 20;

    var currentCharIndex = 0;
    var displayedText = '';
    var currentLine;

    function typing() {
        displayedText = ' ';
        currentLine = Math.max(0, currentArrayIndex - scrollStartLine);
        var destination = p;

        while (currentLine < currentArrayIndex) {
            displayedText += textArray[currentLine++] + '<br />';
        }
        destination.innerHTML = displayedText + textArray[currentArrayIndex].substring(0, currentCharIndex) + "_";
        if (currentCharIndex++ == currentTextLength) {
            currentCharIndex = 0;
            currentArrayIndex++;
            if (currentArrayIndex != textArray.length) {
                currentTextLength = textArray[currentArrayIndex].length;
                setTimeout(typing, 500);
            }
            else {
                destination.innerHTML = displayedText + textArray[currentArrayIndex - 1].substring(0, currentTextLength);
                if (typeof func === "function") func();
            }
        } else {
            setTimeout(typing, typingSpeed);
        }
    }
    typing();
}

window.choice = (content, body) => {
    const button = document.createElement("button");
    button.innerHTML = content;
    button.onclick = () => {
        Array.prototype.slice.call(container.getElementsByTagName("button"), 0).forEach(element => {
            element.remove();
        });
        const p = document.createElement("p");
        p.innerHTML = button.innerHTML;
        p.class = "answered";
        window.container.appendChild(p);
        window.execute(0, body);
    };
    container.appendChild(button);
}

window.diversion = (section) => {
    if (section) section();
}

window.end = () => {
    window.text("--- The End ---");
    throw "Thanks for playing!!!";
}

window.execute = (index, ast) => {
    if (ast[index])
        switch (ast[index].type) {
            case "Var":
                eval(ast[index].name + "=" + ast[index].value);
                window.execute(index + 1, ast);
                break;
            case "Text":
                window.text(ast[index].content, () => { window.execute(index + 1, ast) });
                break;
            case "Diversion":
                window.diversion(window.ast[index].section);
                window.execute(index + 1, ast);
                break;
            case "Choice":
                window.choice(window.ast[index].content);
                window.execute(index + 1, ast);
                break;
        }
}

window.ast.forEach(node => {
    if (node.type = "Section") eval("function" + node.name + "(){const localAst=" + JSON.stringify(node.body, null, 0) + ";window.execute(0,localAst);}");
})

window.execute(0, ast);
