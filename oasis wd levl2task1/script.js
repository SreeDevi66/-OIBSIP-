// Calculator Class
class Calculator {
    constructor(previousElement, currentElement) {
        this.previousElement = previousElement;
        this.currentElement = currentElement;
        this.clear();
    }

    // Clear all values
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // Delete last digit
    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
        this.updateDisplay();
    }

    // Append number to current operand
    appendNumber(number) {
        // Prevent multiple decimal points
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        // Replace initial zero with number (except for decimal)
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
        this.updateDisplay();
    }

    // Choose operation
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        
        // If there's a previous operation, compute it first
        if (this.previousOperand !== '') {
            this.compute();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
        this.updateDisplay();
    }

    // Perform calculation
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        // Check if both operands are valid numbers
        if (isNaN(prev) || isNaN(current)) return;

        // Perform operation based on operator
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('Error: Cannot divide by zero');
                    this.clear();
                    this.updateDisplay();
                    return;
                }
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }

        // Round to avoid floating point errors
        this.currentOperand = Math.round(computation * 100000000) / 100000000;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    // Format number for display with commas
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { 
                maximumFractionDigits: 0 
            });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    // Update display elements
    updateDisplay() {
        this.currentElement.textContent = this.getDisplayNumber(this.currentOperand);
        
        if (this.operation != null) {
            this.previousElement.textContent = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousElement.textContent = '';
        }
    }
}

// Initialize calculator
const previousElement = document.getElementById('previous');
const currentElement = document.getElementById('current');
const calculator = new Calculator(previousElement, currentElement);

// Event listeners for number buttons
const numberButtons = document.querySelectorAll('[data-number]');
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.number);
    });
});

// Event listeners for operator buttons
const operatorButtons = document.querySelectorAll('[data-operator]');
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.operator);
    });
});

// Event listener for equals button
const equalsButton = document.querySelector('[data-action="equals"]');
equalsButton.addEventListener('click', () => {
    calculator.compute();
});

// Event listener for clear button
const clearButton = document.querySelector('[data-action="clear"]');
clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

// Event listener for delete button
const deleteButton = document.querySelector('[data-action="delete"]');
deleteButton.addEventListener('click', () => {
    calculator.delete();
});

// Keyboard support
document.addEventListener('keydown', (event) => {
    // Numbers and decimal point
    if ((event.key >= '0' && event.key <= '9') || event.key === '.') {
        calculator.appendNumber(event.key);
    }
    // Operators
    else if (event.key === '+' || event.key === '-') {
        calculator.chooseOperation(event.key);
    }
    else if (event.key === '*') {
        calculator.chooseOperation('×');
    }
    else if (event.key === '/') {
        event.preventDefault(); // Prevent browser search
        calculator.chooseOperation('÷');
    }
    else if (event.key === '%') {
        calculator.chooseOperation('%');
    }
    // Execute calculation
    else if (event.key === 'Enter' || event.key === '=') {
        calculator.compute();
    }
    // Delete
    else if (event.key === 'Backspace') {
        calculator.delete();
    }
    // Clear
    else if (event.key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
    }
});
