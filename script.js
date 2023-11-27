// Last Clicked operator held in this var
let operator;
const operatorArray = ["÷", "x", "-", "+"];

var numbersAndOperationsArray = []
// Store the number on display before any operation button was clicked
currentNumber = ""

/* Operate on given numbers and selected operator */
const operation = (num1, num2, operator) => {
    /* Functions for the seperate operations */
    const add = (a, b) => a + b;
    const subtract = (a, b) => a - b;
    const multiply = (a, b) => a * b;
    const divide = (a, b) => a / b;

    switch (operator) {
        case "÷":
            return divide(num1, num2);
        case "x":
            return multiply(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "+":
            return add(num1, num2);
        default:
            console.log("You've got a bug buds.");
    }
};

//#########BUTTON FUNCTIONALITY############
/* Update operator variable each time the operator variable is clicked */
const operatorButtons = document.querySelectorAll('.operation');
operatorButtons.forEach(button => {
    button.addEventListener('click', e => {
        operator = e.target.innerText;
        if (currentNumber != "") {
            numbersAndOperationsArray.push(currentNumber)
            currentNumber = ""
        }
        numbersAndOperationsArray.push(operator)
        writeToDisplay(operator);
    })
});

/* Write Numbers to display and update num1,num2 variables */
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', e => {
        number = e.target.innerText;
        writeToDisplay(number)
        currentNumber += number
    })
});

/* General Function needed to write characters on calc display*/
const writeToDisplay = (item) => {

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

/* Calculate the screen */
// Clear Screen 
// Assign the result to num1
// const calculateScreen = 
const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener('click', () => {
    if (checkForErrors = false) {
        return;
    }
    if (currentNumber != "") {
        numbersAndOperationsArray.push(currentNumber)
        currentNumber = ""
    }
    document.querySelector("span").innerText = orderofOperations();
    numbersAndOperationsArray = []
});

/*
    1- Check if your array has division OR multiplication
    2 - If divison, get the index
    3 - If multiplication, get the index
    4 - Which index is smaller? Operate on the smaller index

    5 - If not multiplication, or division, do it with addition and subtraction
*/

function orderofOperations() {
    // For order of operations, first do division and multiplication
    while (numbersAndOperationsArray.includes("x") || (numbersAndOperationsArray.includes("÷"))) {
        // if left to right, multiplication first do this
        if (numbersAndOperationsArray.indexOf("x") > numbersAndOperationsArray.indexOf("÷")) {
            let xIndex = numbersAndOperationsArray.indexOf("x");
            let num1 = Number(numbersAndOperationsArray[xIndex - 1]);
            let num2 = Number(numbersAndOperationsArray[xIndex + 1]);
            numbersAndOperationsArray[xIndex + 1] = operation(num1, num2, "x")
            numbersAndOperationsArray.splice(xIndex - 1, 2)
            // if left to right, division is first do this
        } else if (numbersAndOperationsArray.indexOf("x") < numbersAndOperationsArray.indexOf("÷")) {
            let divIndex = numbersAndOperationsArray.indexOf("÷");
            let num1 = Number(numbersAndOperationsArray[divIndex - 1]);
            let num2 = Number(numbersAndOperationsArray[divIndex + 1]);
            numbersAndOperationsArray[divIndex + 1] = operation(num1, num2, "÷")
            numbersAndOperationsArray.splice(divIndex - 1, 2)
        }
    }
    while (numbersAndOperationsArray.includes("+") || (numbersAndOperationsArray.includes("-"))) {
        // if left to right, multiplication first do this
        if (numbersAndOperationsArray.indexOf("+") > numbersAndOperationsArray.indexOf("-")) {
            let xIndex = numbersAndOperationsArray.indexOf("+");
            let num1 = Number(numbersAndOperationsArray[xIndex - 1]);
            let num2 = Number(numbersAndOperationsArray[xIndex + 1]);
            numbersAndOperationsArray[xIndex + 1] = operation(num1, num2, "+")
            numbersAndOperationsArray.splice(xIndex - 1, 2)
            // if left to right, division is first do this
        } else if (numbersAndOperationsArray.indexOf("+") < numbersAndOperationsArray.indexOf("-")) {
            let divIndex = numbersAndOperationsArray.indexOf("-");
            let num1 = Number(numbersAndOperationsArray[divIndex - 1]);
            let num2 = Number(numbersAndOperationsArray[divIndex + 1]);
            numbersAndOperationsArray[divIndex + 1] = operation(num1, num2, "-")
            numbersAndOperationsArray.splice(divIndex - 1, 2)
        }
    }
    return numbersAndOperationsArray[0]
}

/* Clear Display when clear button is clicked */
const clearDisplay = () => document.querySelector("span").innerText = "";
const clearButton = document.querySelector(".clear");
clearButton.addEventListener('click', clearDisplay);

const deleteDisplay = () => {
    let currentDisplay = document.querySelector("span").innerText;
    currentDisplay = currentDisplay.slice(0, -1);
    document.querySelector("span").innerText = currentDisplay;
}
let deleteButton = document.querySelector(".delete");
deleteButton.addEventListener('click', deleteDisplay);
