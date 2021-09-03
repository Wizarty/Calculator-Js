class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperandTextElement.innerText = '';
        this.previousOperandTextElement.innerText = '';
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = '';
    }

    delete() {
        if( typeof(this.currentOperand) !== 'string') return;
        this.currentOperand = this.currentOperand.slice(0,-1);
    }

    appendNumber(number) {
        if(typeof(this.currentOperand) !== 'string') return;
        if( number === '.' && this.currentOperand.includes('.') ) return;
        this.currentOperand =  this.currentOperand.toString() + number.toString();
    }

    
    computeUnoOperation(operation) {
        let result;
        const curr = parseFloat(this.currentOperand);
		
		function fact(num) {
			  if (num < 0) 
				  return -1;
			  else if (num == 0) 
				  return 1;
			  else {
				  return (num * fact(num - 1));
				}
			}
		
        if( isNaN(curr) ) return;

        switch(operation) {
			case '%': 
                result = curr/100;
                break;
            case '√':
		result = Math.sqrt(curr);
                break;
            case '±':
                result = - curr;
                break;
	    case '!': 
                result = fact(curr);
                break;
            default: 
                return;
        }
        this.currentOperand = result;
    }

    chooseDuoOperation(operation) {
        if(this.currentOperand === '' || this.currentOperand === '.') return;

        if(this.previousOperand !== '') this.compute(); 

        switch(operation){
             case 'n√x':
                this.operation = 'yroot';
                break;
            case '^':
                this.operation = '^';
                break;
			
            default:
                this.operation = operation;        
        }
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let result;
        const prev = parseFloat(this.previousOperand),
              curr = parseFloat(this.currentOperand);

        if( isNaN(prev) || isNaN(curr) ) return;
		
        switch(this.operation) {
            case '+': 
                if( isNaN(prev) ) return;
                result = prev + curr;
                break;
            case '-':
                if( isNaN(prev) ) return;
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '÷':
		result = prev / curr;
                break;
            case 'yroot':
                result = prev ** (1 / curr);
                break;
            case '^':
                result = prev ** curr;
                break;
          
            default: 
                return;
        }

        this.currentOperand = result;
        this.previousOperand = '';
        this.operation = '';
    }

    getDisplayNumber(number) {
		
	function isInt(n){
		return Number(n) === n && n % 1 === 0;
	}

	function isFloat(n){
		return Number(n) === n && n % 1 !== 0;
	}

        if(number !== number || typeof(number) === 'string' ) return number;
		else if (isInt(number))  return Number(number.toString().slice(0,10));
        else if (isFloat(number)) return parseFloat(number.toPrecision(10)).toString().slice(0,11);
		
        
    }

    updateDisplay(updateAllValues = true) {
	    
	if (this.currentOperand == '-Infinity' || this.currentOperand == 'Infinity' || this.currentOperand == 'NaN' || this.currentOperand == 'NaN') {
	this.currentOperandTextElement.innerText = 'Error'
	this.currentOperand = ''
	} else if(!updateAllValues) return;

        if( this.operation != '' ) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
	    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const duoOperationButtons = document.querySelectorAll('[data-duo-operation]');
const unoOperationButtons = document.querySelectorAll('[data-uno-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => { 
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay(); 
    });
});

unoOperationButtons.forEach(button => { 
    button.addEventListener('click', () => {
        calculator.computeUnoOperation(button.innerText);
        calculator.updateDisplay(false); 
    });
});

duoOperationButtons.forEach(button => { 
    button.addEventListener('click', () => {
        calculator.chooseDuoOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});


