const container = document.getElementById("container");

function typeWriter(content, p, func) {
    
}

function br() {
    const br = document.createElement("br");
    container.appendChild(br);
}

function text(content, func, color) {
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
                if (func) func();
                return;
            }
        } else {
            setTimeout(typing, typingSpeed);
        }
    }
    typing();
}

function choice(content, body, func) {
    const button = document.createElement("button");
    button.innerHTML = content;
    button.onclick = () => {
        Array.prototype.slice.call(container.getElementsByTagName("button"), 0).forEach(element => {
            element.remove();
        });
        br();
        text(content, () => { br(); body(); }, "gray");
    };
    container.appendChild(button);

    if (func) func();
}

function diversion(section) {
    if (section) section();
}

function end() {
    text("--- The End ---");
    throw "Thanks for playing!!!";
}

text("1 2 3 4 5 6 7 8 9 10 Done!")
