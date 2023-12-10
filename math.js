// Vito
// razlomak
// ctg-1
// binomial coefficient

// Leon
// linearna
// kvadratna
// funkcija (y za x)
// decimal u razlomak / mjesoviti

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function power(num1, num2) {
    return Math.pow(num1, num2);
}

function NthRoot(num1, num2) {
    return Math.pow(num1, 1 / num2);
}

// function fraction(num1, num2 ) {
//     return num1 / num2;
// }

function sin(num1){
    return Math.sin(num1);
}
function asin(num1){
    return Math.asin(num1);
}

function cos(num1){
    return Math.cos(num1);
}
function acon(num1){
    return Math.acos(num1);
}

function tan(num1){
    return Math.tan(num1);
}
function atan(num1){
    return Math.atan(num1);
}

function ctg(num1) {
    return 1 / Math.tan(num1); 
}

function log(a, x) {
    return Math.log(x) / Math.log(a);
}

function abs(num1){
    return Math.abs(num1);
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        let fact = 1;
        for (let i = 2; i <= n; i++) {
            fact *= i;
        }
        return fact;
    }
}
