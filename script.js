// This ugly global variable here for some reason.
let operator;
const operatorArray = ["÷", "x", "-", "+"];
var array = []
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
        if (currentNumber != ""){
            array.push(currentNumber)
            currentNumber = ""
        }
        array.push(operator)
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
    if (currentNumber != ""){
    array.push(currentNumber)
    currentNumber = ""
    }
    document.querySelector("span").innerText = orderofOperations();
    array = []
});


/*
    1- Check if your array has division OR multiplication
    2 - If divison, get the index
    3 - If multiplication, get the index
    4 - Which index is smaller? Operate on the smaller index

    5 - If not multiplication, continue
*/

function orderofOperations() {
    // For order of operations, first do division and multiplication
    while (array.includes("x") || (array.includes("÷"))){
        // if left to right, multiplication first do this
        if (array.indexOf("x") > array.indexOf("÷")) {
            let xIndex = array.indexOf("x");
            let num1 = Number(array[xIndex - 1]);
            let num2 = Number(array[xIndex + 1]);
            array[xIndex + 1] = operation(num1,num2,"x")
            array.splice(xIndex - 1 ,2)
        // if left to right, division is first do this
        }else if(array.indexOf("x") < array.indexOf("÷")){
            let divIndex = array.indexOf("÷");
            let num1 = Number(array[divIndex - 1]);
            let num2 = Number(array[divIndex + 1]);
            array[divIndex + 1] = operation(num1,num2,"÷")
            array.splice(divIndex - 1 ,2)
        }
    }
    while (array.includes("+") || (array.includes("-"))){
        // if left to right, multiplication first do this
        if (array.indexOf("+") > array.indexOf("-")) {
            let xIndex = array.indexOf("+");
            let num1 = Number(array[xIndex - 1]);
            let num2 = Number(array[xIndex + 1]);
            array[xIndex + 1] = operation(num1,num2,"+")
            array.splice(xIndex - 1 ,2)
        // if left to right, division is first do this
        }else if(array.indexOf("+") < array.indexOf("-")){
            let divIndex = array.indexOf("-");
            let num1 = Number(array[divIndex - 1]);
            let num2 = Number(array[divIndex + 1]);
            array[divIndex + 1] = operation(num1,num2,"-")
            array.splice(divIndex - 1 ,2)
        }
    }
    return array[0]
}


function updateNumbers() {
    let num1;
    let num2;
    let currentNumber = num1;
    let currentDisplay = document.querySelector("span").innerText;

    // Pointer to keep track of where the numbers start since last operator
    let ptr = 0
    let i = 0
    // i is the second pointer trying to find the next operator index
    while (i < currentDisplay.length) {
        i += 1
        if (operatorArray.includes(currentDisplay[i])) {
            num1 = Number(currentDisplay.slice(ptr, i));
            currentNumber = num1
            ptr = i + 1
            let j = i + 1

            while (j < currentDisplay.length
                && !operatorArray.includes(currentDisplay[j])) {
                j += 1;
            }
            num2 = Number(currentDisplay.slice(ptr, j));
            num1 = operation(num1, num2, currentDisplay[i]);
            currentNumber = num1;
            // Update pointers for the next iteration
            ptr = j;
            i = j;
            document.querySelector("span").innerText = num1;
        }

    }
    return
};

function findNumbers(currentDisplay) {
    
    if (currentDisplay.includes("*")) {

    }
}


// function checkForErrors() {
//     let currentDisplay = document.querySelector("span").innerText;
//     const lastItemAtDisplay = currentDisplay[currentDisplay.length - 1]
//     if (operatorArray.includes(lastItemAtDisplay)) {
//         document.querySelector("span").innerText = "That won't work."
//         return false;
//     }
// }




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
