//para consola
for (let i = 1; i <= 100; i++) {
    if (i % 3 == 0 & i % 5 == 0){
        console.log('fizzbuzz');
    } else if
    (i % 3 == 0) {
        console.log('fizz');
    } else if (i % 5 == 0) {
        console.log('buzz');
    } else {
        console.log(i);
    }
}

//para DOM
const solution = document.querySelector("#solution");

for (let i = 1; i <= 100; i++) {
    if (i % 3 == 0 & i % 5 == 0){
        solution.innerHTML += "fizzbuzz<br/>";
    } else if
    (i % 3 == 0) {
        solution.innerHTML += "fizz<br/>";
    } else if (i % 5 == 0) {
        solution.innerHTML += "buzz<br/>";
    } else {
        solution.innerHTML += i + "<br/>";
    }
}

