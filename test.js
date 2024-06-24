window.container = document.getElementById("container");

window.text = (content) => {
    const p = document.createElement("p");
    p.innerHTML = content;
    container.appendChild(p);
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
