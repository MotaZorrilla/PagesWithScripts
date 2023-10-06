//Para consola
const simbolos = {
    "a": "@",
    "b": "8",
    "c": "(",
    "d": "|)",
    "e": "3",
    "f": "|=",
    "g": "6",
    "h": "|-|",
    "i": "1",
    "j": "[]",
    "k": "|<",
    "l": "|_",
    "m": "|\/|",
    "n": "|\\|",
    "o": "0",
    "p": "|*",
    "q": "()",
    "r": "|2",
    "s": "5",
    "t": "7",
    "u": "v",
    "v": "u",
    "w": "\/\/",
    "x": "><",
    "y": "'/",
    "z": "2"
};

const input = document.querySelector("#Texto");

input.addEventListener("input", () => {
    
    const texto = input.value;

    const resultado = texto.split("").map((letra) => {
        return simbolos[letra] || letra;
    });

    const solution = document.querySelector("#solution");
    solution.innerHTML = resultado.join("");

    console.log(resultado.join(""));
    
});
