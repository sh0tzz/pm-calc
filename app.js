class Calculator{
    constructor(display, alt) {
        this.display = display;
        this.cursor_pos = 0;
        this.alt_display = alt;
        this.input = "";
        this.alt_text = "";
        this.prev_ans = "";
        this.settings = {
            // angle-unit: "deg", "rad" 
            "angle-unit": "deg",
            //"num-format": "norm", "sci"
            "num-format": "norm",
        }
    }

    evaluate() {
        this.alt_text = this.input;
        console.log(this.input);

        //razdvajanje elemenata
        let number = "";
        let operator = "";
        const operators = ["+", "-", "×", "÷", "pow", "log", "sin",
         "asin", "cos", "acos", "tan", "atan", "(", ")", ".", "Ans",
         "°","'", "\""];
        let list = [];
        for(let i = 0; i < this.input.length; i ++) {
            if(number == "" && operator == "") {
                if(this.input[i] >= '0' && this.input[i] <= '9') {
                    number += this.input[i];
                }
                else if(operators.includes(this.input[i])) {
                    list.push(this.input[i]);
                }
                else {
                    operator += this.input[i];
                }
            }
            else if(number != "" && operator == "") {
                if(this.input[i] >= '0' && this.input[i] <= '9') {
                    number += this.input[i];
                }
                else if(operators.includes(this.input[i])) {
                    list.push(number);
                    number = "";
                    list.push(this.input[i]);
                }
                else{
                    list.push(number);
                    number = "";
                    operator += this.input[i];
                }
            }
            else if(number == "" && operator != "") {
                if(this.input[i] >= '0' && this.input[i] <= '9') {
                    list.push(operator);
                    operator = "";
                    number += this.input[i];
                }
                else if(operators.includes(this.input[i])) {
                    list.push(operator);
                    operator = "";
                    list.push(this.input[i]);
                }
                else {
                    operator += this.input[i];
                }
            }
        }

        if(number != "") {
            list.push(number);
        }
        
        if(operator != "") {
            list.push(operator);
        }


        //spajanje decimalnih brojeva
        let decnum;
        for(let i = 0; i<list.length; i++) {
            if(list[i] == '.') {
                decnum = list[i-1] + list[i] + list[i+1];
                list.splice(i-1,3,decnum);
            }
        }

        //checkiranje jel dobar upis
        for (let i = 0; i < list.length; i++) {
            if(list[i] >= '0' && list[i] <= '9') {
                continue;
            }
            if(operators.includes(list[i])) {
                continue;
            }
            else{
                console.log("error: wrong input; input not an operator or a number");
            }
        }

        //pronalazenje i checkiranje zagrada
        let l_paren = -1;
        let r_paren = -1;
        for(let i = 0; i < list.length; i++) {
            if(list[i] == '(') {
                l_paren = i;
            }
            if(list[i] == ')') {
                r_paren = i;
                break;
            }
        }
        if(l_paren == -1 && r_paren != -1 || l_paren != -1 && r_paren == -1) {
            console.log("error: wrong number of parentheses");
        }

        let index_of_operation;
        let temp_result;
        //redoslijed operacija
        if(list.includes("×")) {
            index_of_operation = list.indexOf('×');
            temp_result = multiply(list[index_of_operation-1], list[index_of_operation+1]);
            list.splice(index_of_operation-1,3,temp_result);;
        }
        if(list.includes("÷")) {
            index_of_operation = list.indexOf('÷');
            temp_result = divide(list[index_of_operation-1], list[index_of_operation+1]);
            list.splice(index_of_operation-1,3,temp_result);;
        }
        if(list.includes("+")) {
            index_of_operation = list.indexOf('+');
            temp_result = add(list[index_of_operation-1], list[index_of_operation+1]);
            list.splice(index_of_operation-1,3,temp_result);;
        }
        if(list.includes("-")) {
            index_of_operation = list.indexOf('-');
            temp_result = subtract(list[index_of_operation-1], list[index_of_operation+1]);
            list.splice(index_of_operation-1,3,temp_result);;
        }

        // nakon evaluacije i racunanja
        // postaviti this.prev_ans
        
        this.update_display();
    }

    update_display() {
        this.display.value = this.input;
        this.alt_display.value = this.alt_text;
        this.display.focus();
        this.display.setSelectionRange(this.cursor_pos, this.cursor_pos);
    }

    move_cursor(x, y) {
        console.log('AAAAAAAAAAAAAA');
        // TODO GORE DOLE
        this.cursor_pos += x + y;
        this.display.focus();
        this.update_display();
    }

    insert(event) {
        let part1 = this.input.slice(0, this.cursor_pos);
        let part2 = this.input.slice(this.cursor_pos);
        let insert_value = event.currentTarget.innerText;
        this.input = part1 + insert_value + part2;
        this.move_cursor(1, 0);
        this.update_display();
    }

    insert_exponent(exponent) {
        this.input += `^${exponent}`;
        this.update_display();
    }

    backspace() {
        this.input = this.input.slice(0, this.cursor_pos-1) + this.input.slice(this.cursor_pos);
        this.move_cursor(-1, 0);
        this.update_display();
    }

    clear() {
        this.input = "";
        this.alt_text = "";
        this.cursor_pos = 0;
        this.update_display();
    }

    TODO(event) {
        // window.alert(`Button ${event.currentTarget.innerText} not implemented`);
        console.log(`Button ${event.currentTarget.innerText} not implemented`);
    }
}

const display = document.getElementById('input-field');
const alt_display = document.getElementById('alt-text');
const calc = new Calculator(display, alt_display);
