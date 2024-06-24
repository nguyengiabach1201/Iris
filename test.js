window.container = document.getElementById("container");

window.text = (content, func, color) => {
    const p = document.createElement("p");
    if (color) p.style.color = color;
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

window.choice = (content) => {
    const button = document.createElement("button");
    button.innerHTML = content;
    button.onclick = () => {
        Array.prototype.slice.call(container.getElementsByTagName("button"), 0).forEach(element => {
            element.remove();
        });
        // br();
        // text(content, () => { br(); body(); }, "gray");
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

window.execute = (index, ast = ast) => {
    if (ast[index].type)
        switch (ast[index].type) {
            case "Var":
                eval(ast[index].name + "=" + ast[index].value);
                window.execute(ast[index + 1]);
                break;
            case "Text":
                window.text(ast[index].content, () => { window.execute(ast[index + 1]) });
                break;
            case "Diversion":

                break;
            case "Section":
                eval("function name(){const localAst=" + JSON.stringify(window.ast[index].body, null, 0) + ";window.execute(0,localAst);}");
                break;
            case "Choice":

                break;
        }
    else { }
}

window.execute(0, ast);
