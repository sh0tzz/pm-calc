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

function solveLinearEquation(equation) {
    // pretostavlja da je u formi ax + b = c, inace bi bilo malo pre hc za napravit i trebo bi mi Dorotein evaluator jer ovaj built in je cringe
    // a, b i c mogu biti razlomci
    let a, b, c;
    
    let [left, right] = equation.replace(/\s+/g, "").split("=");
    
    let indexOfUnknown = left.indexOf("x");
    
    a = fractionToDecimal(left.slice(0, indexOfUnknown));
    b = fractionToDecimal(left.slice(indexOfUnknown + 1));
    c = fractionToDecimal(right);
    
    return Number(((c - b) / a).toFixed(10));
}

function solveQuadraticEquation(equation) {
    // pretostavlja se da je u formi ax^2 + bx + c = 0
    // a, b i c mogu biti razlomci
    let a, b, c;
    
    let left = equation.replace(/\s+/g, "").split("=")[0];
    
    let indexOfFirstUnknown = left.indexOf("x^2");
    let indexOfLastUnknown = left.lastIndexOf("x");
    
    console.log(indexOfFirstUnknown, indexOfLastUnknown);
    
    a = fractionToDecimal(left.slice(0, indexOfFirstUnknown));
    b = left.slice(indexOfFirstUnknown + 3, indexOfLastUnknown);
    c = fractionToDecimal(left.slice(indexOfLastUnknown + 1));
    
    let discriminant = b * b - 4 * a * c;
    
    if (discriminant > 0) {
        let root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        let root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        return [Number(root1.toFixed(10)), Number(root2.toFixed(10))];
    } else if (discriminant == 0) {
        let root = -b / (2 * a);
        return Number(root).toFixed(10);
    } else {
        throw new Error("No real solutions");
    }
}

function toggleFraction(number) {
    let decimal = fractionToDecimal(number.toString());
    
    if (decimal !== number) return decimal;
    
    return decimalToFraction(decimal);
}

function gcd(a, b) { // najveci zajednici djeljitelj
    return b === 0 ? a : gcd(b, a % b);
}

function fractionToDecimal(fraction) {
    if (fraction.includes("/")) {
        fraction = fraction.replace(/[()]/g, "");
        let [numerator, denominator] = fraction.split("/").map(Number);
        return numerator / denominator;
    }
    return Number(fraction);
}

function hasRepeatingPattern(strNum, control = { skip: 0, repeatedPattern: ""}) {
    // ako input broj nije string za brojeve s puno znamenaka nece radit
    strNum = strNum.toString(); // u slucaju da input nije string
    if (control.skip > 3) return false; // odabrao 3 jer casio kalkulatori isto makismalno preskacu prva 3
    
    let remainingString = strNum.substring(control.skip);
    let length = remainingString.length;
    
    for (let patternLength = 1; patternLength <= 3; patternLength++) {
        if (length < 4 + (2 * patternLength)) return false; // u slucaju da je broj pre kratak
        
        if (length % patternLength === 0) {
            let pattern = remainingString.substring(0, patternLength);
            let repeatedPattern = pattern.repeat(length / patternLength);

            if (remainingString === repeatedPattern) {
                control.repeatedPattern = pattern;
                return true;
            }
        }
    }

    control.skip++;
    return hasRepeatingPattern(strNum, control);
}

function decimalToFraction(strDecimal) {
    // ako input nije string za brojeve s puno decimala nece radit
    strDecimal = strDecimal.toString(); // u slucaju da input nije string
    if(!strDecimal.includes(".")) return Number(strNum); // u slucaju da nije decimal

    let [integerPart, fractionalPart] = strDecimal.split(".");

    let control = { skip: 0, repeatedPattern: ""};
    let isRepatingDecimal = hasRepeatingPattern(fractionalPart, control);

    if (isRepatingDecimal) {
        let nonRepeatingPart = fractionalPart.substring(0, control.skip);
        let repeatingPart = control.repeatedPattern;

        let nonRepeatingDigits = control.skip;
        let repeatingDigits = repeatingPart.length;

        let wholeNumber = parseInt(integerPart + nonRepeatingPart + repeatingPart);
        let nonRepeatingWholeNumber = parseInt(integerPart + nonRepeatingPart);

        let numerator = wholeNumber - nonRepeatingWholeNumber;
        let denominator = Math.pow(10, nonRepeatingDigits + repeatingDigits) - Math.pow(10, nonRepeatingDigits);

        let commonDivisor = gcd(denominator, numerator);
        denominator /= commonDivisor;
        numerator /= commonDivisor;

        return `${numerator}/${denominator}`;
    }

    let decimalCount = fractionalPart.length;
    if (decimalCount > 12) strNum = strNum.slice(0, strNum.length - decimalCount + 12);

    let denominator = Number(Math.pow(10, decimalCount));
    let numerator = Number(strDecimal * denominator);

    let commonDivisor = gcd(denominator, numerator);
    denominator /= commonDivisor;
    numerator /= commonDivisor;

    if (denominator > Math.pow(10, 5) - 1) return strDecimal; // glupo je da za ispise broj sa tako velikim nazivnikom, to rade i casio kalkulatori

    return `${numerator}/${denominator}`;
}

function fractionToMixedFraction(fraction) {
    fraction = fraction.toString();
    
    if (fraction.includes(".")) fraction = decimalToFraction(fraction);
    if (!fraction.includes("/")) return fraction;

    let values = fraction.split("/");
    let numerator = Number(values[0]);
    let denominator = Number(values[1]);
    
    if (Math.abs(numerator) < Math.abs(denominator)) return fraction;
    
    let result = `${~~(numerator / denominator)}(${numerator - (~~(numerator / denominator) * denominator)}/${denominator})`;
    if (fraction.includes("-")) //pretostavljam da nemre bit 2 minusa tj. minus u nazivniku i brojniku jer se ova funkcija koristi samo na finalnom rezultatu
    {
        result = result.replace(/-/g, ""); 
        result = `-${result}`;
    }
    return result;
}

function mathFunction(func, x) {
    // pretostavlja se da je u formi f(x) = ...
    // ne dela ako je recimo f(x)=3x, treba biti f(x)=3*x
    func = func.toString().replace(/\s+/g, "");

    let expression = func.split("=")[1].replace(/x/g, x);
    expression = expression.replace(/[^0-9+\-*/(). ]/g, "") // eval() je security risk pa ovo mice sve osim osnovnih matematickih operacija

    return eval(expression); // tu bi se umjeto eval() koristilo ovo kaj Dorotea radi pretpostavljam idk
}
