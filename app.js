class Calculator{
    constructor(display, alt) {
        this.display = display;
        this.cursor_pos = 0;
        this.alt_display = alt;
        this.input = "";
        this.alt_text = "";
        this.prev_ans = "";
        this.shift_buttons = document.getElementsByClassName('shift');
        this.nonshift_buttons = document.getElementsByClassName('non-shift');
        this.old_color;
        this.shift = true;
        this.toggle_shift();
        this.settings = {
            // angle-unit: "deg", "rad" 
            "angle-unit": "deg",
            //"num-format": "norm", "sci"
            "num-format": "norm",
        }
    }

    evaluate() {
        this.alt_text = this.input;

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
                    list.push(parseInt(number));
                    number = "";
                    list.push(this.input[i]);
                }
                else{
                    list.push(parseInt(number));
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
            list.push(parseInt(number));
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
        
        //provjeravanje broja zagrada
        if (this.count(list,'(') != this.count(list,')')){
            console.log("broj zagrada nije jednak!");
            return;
        }

        //pronalazenje i racunanje zagrada
        let l_paren = -1;
        let r_paren = -1;
        let partial_list = [];
        while(list.includes('(') && list.includes(')')){
            for(let i = 0; i < list.length; i++) {
                if(list[i] == '(') {
                    l_paren = i;
                }
                if(list[i] == ')') {
                    r_paren = i;
                    partial_list = list.slice(l_paren+1, r_paren);
                    list.splice(l_paren, (r_paren-l_paren)+1,this.pemdas(partial_list));
                    l_paren = -1;
                    r_paren = -1;
                }
            }
        }

        this.pemdas(list);
        this.prev_ans = list[0];
        this.input = `${list[0]}`;
        this.update_display();
    }

    update_display() {
        this.display.value = this.input;
        this.alt_display.value = this.alt_text;
        this.display.focus();
        this.display.setSelectionRange(this.cursor_pos, this.cursor_pos);
    }

    move_cursor(x, y) {
        // TODO GORE DOLE
        this.cursor_pos += x + y;
        this.display.focus();
        this.update_display();
    }

    toggle_shift() {
        let btn = document.getElementById('shift-button');
        this.shift = !this.shift;
        let children;
        if (this.shift) {
            this.old_color = btn.style.backgroundColor;
            btn.style.backgroundColor = 'green';
            for (let i = 0; i < this.nonshift_buttons.length; i++) {
                this.nonshift_buttons[i].style.display = "none";
                children = this.nonshift_buttons[i].getElementsByTagName('button');
                for (let j = 0; j < children.length; j++) {
                    this.nonshift_buttons[i].style.display = "none";
                }
            }
            for (let i = 0; i < this.shift_buttons.length; i++) {
                this.shift_buttons[i].style.display = "flex";
                children = this.shift_buttons[i].getElementsByTagName('button');
                for (let j = 0; j < children.length; j++) {
                    this.shift_buttons[i].style.display = "flex";
                }
            }
        } else {
            document.getElementById('shift-button').style.backgroundColor = this.old_color;
            for (let i = 0; i < this.nonshift_buttons.length; i++) {
                this.nonshift_buttons[i].style.display = "flex";
                children = this.nonshift_buttons[i].getElementsByTagName('button');
                for (let j = 0; j < children.length; j++) {
                    this.nonshift_buttons[i].style.display = "flex";
                }
            }
            for (let i = 0; i < this.shift_buttons.length; i++) {
                this.shift_buttons[i].style.display = "none";
                children = this.shift_buttons[i].getElementsByTagName('button');
                for (let j = 0; j < children.length; j++) {
                    this.shift_buttons[i].style.display = "none";
                }
            }
        }
    }

    insert(event) {
        let part1 = this.input.slice(0, this.cursor_pos);
        let part2 = this.input.slice(this.cursor_pos);
        let insert_value = event.currentTarget.innerText;
        this.input = part1 + insert_value + part2;
        this.move_cursor(1, 0);
        this.update_display();
    }

    insert_special(text='', cursor_offset=0) {
        let part1 = this.input.slice(0, this.cursor_pos);
        let part2 = this.input.slice(this.cursor_pos);
        let insert_value = text;
        this.input = part1 + insert_value + part2;
        this.move_cursor(text.length + cursor_offset, 0);
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
    pemdas(list) {
        //redoslijed operacija
        let index_of_operation;
        let temp_result;
        let operations = {
            '×': multiply,
            '÷': divide,
            '/': divide,
            '+': add,
            '-': subtract
        }
        let ops = Object.keys(operations);
        for (let i = 0; i < ops.length; i++) {
            while(list.includes(ops[i])) {
                index_of_operation = list.indexOf(ops[i]);
                temp_result = operations[ops[i]](list[index_of_operation-1], list[index_of_operation+1]);
                list.splice(index_of_operation-1,3,temp_result);;
            }
        }
        return list[0];
    }
    count(list,element) {
        let count_element = 0;
        for(let i = 0; i<list.length; i++){
            if(list[i] === element) {
                count_element += 1;
            }
        }
        return count_element;
    }
}

const display = document.getElementById('input-field');
const alt_display = document.getElementById('alt-text');
const calc = new Calculator(display, alt_display);
