// const toLower   = a => a.toLowerCase();
// const show      = a => console.log(a);
// const compose   = (f1,f2) => a => f2(f1(a));
// const toLowerAndShow = compose(toLower, show);

// toLowerAndShow("HÉCTOR")

// const add = (a, b) => a + b;
// const mul = (a, b) => a * b;
// const compose = (f1, f2) => 
//     (a, b, c) => f2(f1(a, b), c);
    
// const addAndMul = compose(add, mul);
// console.log(addAndMul(2,3,10));






// const names   = ["Héctor","Francisco","Yetzibel"];
// const toUpper = data => data.map(e => e.toUpperCase());
// const createP = data => data.map(e => `<p><b>${e}</b></p>`);
// const compose = (f1,f2) => data => f2(f1(data));
// const toUpperAndCreateP = compose(toUpper, createP);

// document.getElementById("content").innerHTML = 
//     toUpperAndCreateP(names).reduce((ac, e) => ac+e);


const names   = ["Héctor","Francisco","Yetzibel"];
const toUpper = data => data.map(e => e.toUpperCase());
const addPoint = data => data.map(e => e + ".");
const concatArray = data => 
    data.reduce((ac, e) => ac +e);
const createP = data => data.map(e => `<p><b>${e}</b></p>`);
const compose = (...fns) => 
    data => 
        fns.reduce((ac, fn) => fn(ac), data);
const toUpperAndCreateP = compose(toUpper, addPoint, createP, concatArray);

document.getElementById("content").innerHTML = 
    toUpperAndCreateP(names);
