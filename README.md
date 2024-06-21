# Iris
A text-based adventure game engine

## How to use
***Iris*** has its own markup language, called ***Iris-script***.

***Iris-script*** is incredibly easy to learn, within ***a few minutes***, you will able to make a text-based game ***yourself***!

### Syntax
**1. Paragraphs**

The most basic part of an ***Iris*** project is a paragraph.
```
Hello, welcome to Iris
```
This will output the content.

Texts on adjacent lines will be counted as one, e.g:
```
Iris
is awesome
```
Is the same as:
```
Iris is awesome
```

To have a break between your paragraphs, just simply have a break line between them:
```
This is the first paragraph!

This is the second one!
```

**2. Comments**

Text will be printed out by default unless it is a comment.

A comment is ignored by ***Iris*** so it wouldn't be printed:
```
# This is a comment, and this is unprintable!
```

**3. Sections**

Sections are the most important part of ***Iris***, for it is the structural unit of the game.

A section starts with a `-` (minus sign), and within every section are normal paragraphs, comments, or choices.

```
- Section_one
Hello, welcome to this section
- Section_two
Zzz, Zzz, section two is sleeping Zzz, Zzz
```

Contents within sections won't be printed out unless you call that section. Call a section with a `>` (arrow sign), as follows:

```
1/1/2000
You are on the street, you really want to go home
> House
- House
"Welcome home, son" - your mother said
...
```

***Notes:*** When you name a section, don't use space or any special characters, otherwise the game will cause errors!!!

**4. Choices**

A choice is indicated by a `+` (plus sign). The choice will flow into the next instruction when you have chosen.

```
You see a cup of coffee
+ Drink it
You blacked out
> Die
+ Not drink it
Not thing happens
> Survive
```

### Build
Run
```
node ./src/iris.js <your file(s) here>
```
It will create a new HTML file(s), open it up, and let's try out your new text-based game! 

🎉🎉🥳 Taddaaa!!! And you have learned how to make a game with Iris!!! 🎊🎊👏

## TODO
- Add conditional contents

## Contact
Feel free to fork this repository or open issues. For any further information, please contact [my email](mailto:nguyengiabach1201@gmail.com).
