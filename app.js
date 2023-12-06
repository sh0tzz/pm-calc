class Calculator{
    constructor() {
        this.input = "";
        this.alt_text = "";
        this.settings = {
            // angle-unit: "deg", "rad" 
            "angle-unit": "deg",
            //"num-format": "norm", "sci"
            "num-format": "norm",
        }
    }
    evaluate() {
        // Dorotea
        console.log(this.input);
    }
    insert(event) {
        this.input += event.target.innerText;
    }
}

const calc = new Calculator();
