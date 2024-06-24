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
                setTimeout(()=>{typing(p)}, 500);
            }
            else {
                destination.innerHTML = displayedText + textArray[currentArrayIndex - 1].substring(0, currentTextLength);
                finished = true;
                window.writingList.shift();
                container.appendChild(p);
                console.log("!")
            }
        } else {
            setTimeout(()=>{typing(p)}, typingSpeed);
        }
    }

    let finished = true;
    function loop() {
        setTimeout(function () {
            if (finished && window.writingList[0]) {
                finished = false;

                if (window.writingList[0].type === "text") {
                    const p = document.createElement("p");

                    textArray = [window.writingList[0].content];
                    displayedText = '', currentCharIndex = 0, currentArrayIndex = 0, currentTextLength = textArray[0].length;

                    typing(p);
                }
                if (window.writingList[0].type === "choice") {
                    window.writingList.shift();
                    container.appendChild(window.writingList[0].button);
                    finished = true;
                }
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
        window.text(content);
        body();
    };
    writingList.push({ type: "choice", button: button });
    // container.appendChild(button);
}

window.diversion = (section) => {
    if (section) section();
    else throw "Error: Section" + section + "is undefined";
}

window.end = () => {
    window.text("--- The End ---");
    throw "Thanks for playing!!!";
}
window.writingControl();
