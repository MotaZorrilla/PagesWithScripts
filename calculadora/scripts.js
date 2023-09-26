let display = document.getElementById('display');
let currentInput = "";
let currentOperator = '';
let prevValue = 0;
let currentValue = '';

function appendToDisplay(value) {
    currentInput += value;
    display.innerText = currentInput;
}

function clearDisplay() {
    currentInput = "";
    display.innerText = '0';
}

function getOperator(operator) {
    if (isValidOperator(operator)) {
        if (currentInput !== "") {
            prevValue = parseFloat(currentInput);
            currentInput = "";
        }
        currentOperator = operator;
    }
}

function calculateResult() {
    if (currentInput === '') return;
    currentValue = parseFloat(currentInput);

    if (!isValidNumber(currentValue)) {
        return;
    }

    switch (currentOperator) {
        case '+':
            prevValue += currentValue;
            break;
        case '-':
            prevValue -= currentValue;
            break;
        case '*':
            prevValue *= currentValue;
            break;
        case '/':
            if (currentValue !== 0) {
                prevValue /= currentValue;
            } else {
                alert('No se puede dividir entre 0');
                clearDisplay();
                return;
            }
            break;
        default:
            prevValue = currentValue;
            break;
    }

    display.innerText = formatNumber(prevValue);
    currentInput = "";
    currentOperator = '';
}

function calculatePercentage() {
    if (currentInput === '') return;

    const currentValue = parseFloat(currentInput);
    if (!isValidNumber(currentValue)) return;

    const percentageValue = prevValue * (currentValue / 100);
    prevValue = percentageValue;
    display.innerText = formatNumber(percentageValue);
    currentInput = "";
    currentOperator = '';
}


function calculateSquareRoot() {
    const currentValue = parseFloat(currentInput);
    if (isValidNumber(currentValue) && currentValue >= 0) {
        prevValue = Math.sqrt(currentValue);
        display.innerText = formatNumber(prevValue);
        currentInput = "";
    } else {
        alert('Entrada inválida para la raíz cuadrada');
        clearDisplay();
    }
}

function toggleSign() {
    const currentValue = parseFloat(currentInput);
    if (isValidNumber(currentValue)) {
        prevValue = -currentValue;
        display.innerText = formatNumber(prevValue);
        currentInput = "";
    }
}

function powerOff() {
    // Implementa la lógica para apagar la calculadora aquí.
    // Por ejemplo, puedes simplemente borrar el contenido del display.
    clearDisplay();
}

function backspace() {
    currentInput = currentInput.slice(0, -1); // Elimina el último carácter
    display.innerText = currentInput;
}

function isValidOperator(operator) {
    return operator === '+' || operator === '-' || operator === '*' || operator === '/' ;
}

function isValidNumber(number) {
    return !isNaN(number);
}

function formatNumber(number) {
    if (Number.isInteger(number)) {
        return number.toString(); // Si es un número entero, no muestra decimales.
    } else {
        return number.toFixed(3); // Si tiene decimales, muestra dos decimales.
    }
}


clearDisplay();
