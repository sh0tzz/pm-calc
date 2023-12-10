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
        // nakon evaluacije i racunanja
        // postaviti this.prev_ans
        this.alt_text = this.input;
        this.input = "";
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
