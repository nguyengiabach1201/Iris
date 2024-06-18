// A text-based adventure game engine

class Iris {
    constructor(src) {
        this.src = src;

        // this.tokens = this.lexer(this.src);
        // this.ast = this.tokens(this.src, this.tokens);
        // this.out = this.output(this.src, this.tokens, this.ast);
    }

    lexer() {

    }

    parser() {

    }

    output() {
        function typeWriter(txt, id) {
            if (i < txt.length) {
                document.getElementById(id).innerHTML += txt.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
    }
}