window.container = document.getElementById("container");
window.writingList = [];

window.writingControl = () => {
    // Typewriting effect
    const textArray = [""];

    const typingSpeed = 50;
    var currentArrayIndex = 0;
    var currentTextLength = textArray[0].length;
    const scrollStartLine = 20;

    var currentCharIndex = 0;
    var displayedText = '';
    var currentLine;

    function typing(p) {
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
                finished = true;
                window.writingList.pop(0);
                container.appendChild(p);
            }
        } else {
            setTimeout(typing, typingSpeed);
        }
    }

    let finished = false;
    function loop() {
        setTimeout(function () {
            if (finished && window.writingList[0]) {
                finished = false;
                const p = document.createElement("p");
                textArray = [window.writingList[0]];
                typing(p);
            }
            loop();
        });
    }
    loop();
}

window.text = (content) => {
    // const p = document.createElement("p");
    writingList.push({ type: "text", content: content });
    // p.innerHTML = content;
    // container.appendChild(p);
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

        body();
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
