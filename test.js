<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Iris</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet" />
    <style>
        #container>.answered,
        #container>button {
            animation: 0.6s cubic-bezier(0.38, 0.97, 0.56, 0.76) 0.1s forwards show;
            opacity: 0;
            transform: rotateX(-90deg);
        }

        #container,
        #container>button,
        #container>button:hover {
            font-family: "Special Elite", system-ui;
        }

        body {
            width: 100vw;
            height: 100vh;
            overflow-x: hidden;
            margin: 5rem 10rem;
        }

        #container {
            width: calc(100vw - 20rem);
            font-size: 20px;
        }

        #container>* {
            margin-top: 0;
            margin-bottom: 7px;
        }

        #container>button {
            width: 100%;
            border: none;
            background: 0 0;
            color: #414141;
            font-size: 15px;
            transform-origin: top center;
        }

        #container>.answered {
            transform-origin: top center;
            color: gray;
            margin-top: 10px;
            margin-bottom: 10px;
        }

        #container>button:hover {
            color: #4b4b4b;
            font-size: 18px;
        }

        @keyframes show {
            100% {
                opacity: 1;
                transform: none;
            }
        }
    </style>
</head>

<body>
    <div id="container"></div>
    <script>
        window.ast = [
            { type: "Var", name: "i", value: "0" },
            { type: "Diversion", section: "Loop" },
            {
                type: "Section",
                name: "Loop",
                body: [
                    {
                        type: "If",
                        condition: "i < 10 ",
                        body: [
                            { type: "Var", name: "i", value: "i + 1" },
                            { type: "Text", content: "${i}" },
                            { type: "Diversion", section: "Loop" },
                        ],
                    },
                    { type: "Text", content: "Done!" },
                ],
            },
        ];
        (window.container = document.getElementById("container")),
            (window.text = (e, t) => {
                let n = document.createElement("p");
                container.appendChild(n);
                let c = [e],
                    a = 50;
                var i,
                    o = 0,
                    r = c[0].length;
                let l = 20;
                var s = 0,
                    u = "";
                function $() {
                    (u = " "), (i = Math.max(0, o - l));
                    for (var e = n; i < o;) u += c[i++] + "<br />";
                    (e.innerHTML = u + c[o].substring(0, s) + "_"),
                        s++ == r
                            ? ((s = 0),
                                ++o != c.length
                                    ? ((r = c[o].length), setTimeout($, 500))
                                    : ((e.innerHTML = u + c[o - 1].substring(0, r)),
                                        "function" == typeof t && t()))
                            : setTimeout($, a);
                }
                $();
            }),
            (window.choice = (e, t) => {
                let n = document.createElement("button");
                (n.innerHTML = e),
                    (n.onclick = () => {
                        Array.prototype.slice
                            .call(container.getElementsByTagName("button"), 0)
                            .forEach((e) => {
                                e.remove();
                            });
                        let e = document.createElement("p");
                        (e.innerHTML = n.innerHTML),
                            (e.class = "answered"),
                            window.container.appendChild(e),
                            window.execute(0, t);
                    }),
                    container.appendChild(n);
            }),
            (window.diversion = (e) => {
                let node_;
                window.ast.forEach((node) => {
                    "Section" == node.type && e == node.name && (node_ = node)

                }), eval(
                    "function " +
                    node_.name +
                    "(){const localAst=" +
                    JSON.stringify(node_.body, null, 0) +
                    ";console.log('!!!');window.execute(0,localAst);}",
                ),
                    eval(`console.log(typeof ${e})`)
                e && eval(e + "()");
            }),
            (window.end = () => {
                throw (window.text("--- The End ---"), "Thanks for playing!!!");
            }),
            (window.execute = (index, ast) => {
                if (ast[index])
                    switch (ast[index].type) {
                        case "Var":
                            eval(ast[index].name + "=" + ast[index].value),
                                window.execute(index + 1, ast);
                            break;
                        case "Text":
                            window.text(ast[index].content, () => {
                                window.execute(index + 1, ast);
                            });
                            break;
                        case "Diversion":
                            window.diversion(window.ast[index].section),
                                window.execute(index + 1, ast);
                            break;
                        case "Choice":
                            window.choice(window.ast[index].content),
                                window.execute(index + 1, ast);
                    }
            }),

            window.execute(0, ast);
    </script>
</body>

</html>
