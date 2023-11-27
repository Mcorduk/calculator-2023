const operatorArray = ["÷", "x", "-","+"];

/* Functions for the seperate operations */
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operation = (num1, num2, operator) => {

    switch (operator) {
        case "÷":
            return divide(a, b);
        case "*":
            return multiply(a, b);
        case "-":
            return subtract(a, b);
        case "+":
            return add(a, b);
        default:
            console.log("You've got a bug buds.");
    }
};

let num1;
let num2;
let operator;
/* Update operator variable each time the operator variable is clicked */
const operatorButtons = document.querySelectorAll('.operation');
operatorButtons.forEach(button => {
    button.addEventListener('click', e => {
        operator = e.target.innerText;
        writeToScreen(operator)
        
    })
});

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', e => {
        num1 = e.target.innerText;
    })
});

const writeToScreen = (item) => {
    let currentDisplay = document.querySelector("span").innerText;
    const length = currentDisplay.length;
    const lastItemAtDisplay = currentDisplay[length - 1]
    if ((operatorArray.includes(item)) 
    && (operatorArray.includes(lastItemAtDisplay))){
        currentDisplay = currentDisplay.slice(0, -1);
    }
     currentDisplay += item;
}
