const number_buttons = document.querySelectorAll('[number]');
const operation_buttons = document.querySelectorAll('[operation]');
const equals_button = document.querySelector('[equals]');
const delete_button = document.querySelector('[delete]');
const ac_button = document.querySelector('[all-clear]');

const previous_operand_text = document.querySelector('[data-previous]');
const current_operand_text = document.querySelector('[data-current]');

class Calculator {
    constructor(previous_operand_text, current_operand_text) {
        this.previous_operand_text = previous_operand_text; 
        this.current_operand_text = current_operand_text;
        this.clear();  
    }

    clear() {
        this.current_text = '';
        this.previous_text = ''; 
        this.operation = undefined; 
    }

    delete() {
        this.current_text = this.current_text.toString().slice(0, -1);

    }

    append_number(number) {
        if (number === '.' && this.current_text.includes('.')) return; 
        this.current_text = this.current_text.toString() + number.toString(); 
    }

    chose_operation(operation) {
        if (this.current_text === '') return; 
        if (this.previous_text !== '') {
            this.compute(); 
        }
        this.operation = operation; 
        this.previous_text = this.current_text; 
        this.current_text = ''; 
    }

    compute() {
        let result; 
        const prev = parseFloat(this.previous_text);
        const curr = parseFloat(this.current_text); 
        if (isNaN(prev) || isNaN(curr)) return; 
        switch (this.operation) {
            case '+':
                result = prev + curr; 
                break; 
            case '-':
                result = prev - curr; 
                break; 
            case '÷':
                result = prev / curr; 
                break; 
            case '*':
                result = prev * curr; 
                break; 
            default:
                return; 
        }
        this.current_text = result; 
        this.operation = undefined; 
        this.previous_text = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        var integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    update() {
        this.current_operand_text.innerText =
            this.getDisplayNumber(this.current_text);
        if (this.operation != null) {
            this.previous_operand_text.innerText =
                `${this.getDisplayNumber(this.previous_text)} ${this.operation}`;
        } else {
            this.previous_operand_text.innerText = '';
        }
    }
}

const calculator = new Calculator(previous_operand_text, current_operand_text);

number_buttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.append_number(button.innerText);
        calculator.update(); 
    });
});

operation_buttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chose_operation(button.innerText);
        calculator.update();
    });
});

equals_button.addEventListener('click', button => {
    calculator.compute(); 
    calculator.update();
});

ac_button.addEventListener('click', button => {
    calculator.clear();
    calculator.update();
});

delete_button.addEventListener('click', button => {
    calculator.delete();
    calculator.update();
});
