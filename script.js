let num1;
let num2;
let operator;

/* Functions for the seperate operations */
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

/* Operate on given numbers and selected operator */
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

/* Update operator variable each time the operator variable is clicked */
const operatorButtons = document.querySelectorAll('.operation');
operatorButtons.forEach(button => {
    button.addEventListener('click', e => {
        operator = e.target.innerText;
        writeToDisplay(operator);
    })
});

/* Write Numbers to display and update num1,num2 variables */
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', e => {
        num1 = e.target.innerText;
        writeToDisplay(num1)
    })
});

/* General Function needed to write characters on calc display*/
const writeToDisplay = (item) => {
    const operatorArray = ["÷", "x", "-", "+"];
    let currentDisplay = document.querySelector("span").innerText;
    const length = currentDisplay.length;
    const lastItemAtDisplay = currentDisplay[length - 1]

    /*Delete the previous operator 
    if there is one so no multiple operators exist */
    if ((operatorArray.includes(item))
        && (operatorArray.includes(lastItemAtDisplay))) {
        currentDisplay = currentDisplay.slice(0, -1);
    }
    /*Append new items */
    currentDisplay += item;
    /* Update the span element with new Display */
    document.querySelector("span").innerText = currentDisplay;
}

/* Clear Display when clear button is clicked */
const clearDisplay = () => document.querySelector("span").innerText = "";
const clearButton = document.querySelector(".clear");
clearButton.addEventListener('click', clearDisplay);