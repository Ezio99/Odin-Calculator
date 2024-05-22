/* eslint-disable no-unused-vars */


let inputExpr = ""
const input = document.querySelector("#expression")
const number_btns = document.querySelector(".calc-numbers").querySelectorAll("button")
const operator_btns = document.querySelector(".calc-operators").querySelectorAll("button")
const backspace = document.querySelector("#backspace")
const calculate = document.querySelector("#calculate")
const allClear = document.querySelector("#AC")





backspace.addEventListener("click", (e) => {
    input.value = input.value.slice(0, input.value.length - 1)
})

calculate.addEventListener("click", (e) => {
    inputExpr = input.value
    input.value = evaluateExpression()
    inputExpr = ""
})

allClear.addEventListener("click",(e) =>{
    input.value = ""
})


addListenerToAppendToExpression(number_btns)
addListenerToAppendToExpression(operator_btns)



function addListenerToAppendToExpression(button_node_list) {
    button_node_list.forEach(btn => {
        btn.addEventListener("click", (e) => {
            input.value += btn.textContent
        })
    })
}



function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(a, b, operator) {
    switch (operator) {
        case "+":
            return add(a, b)

        case "-":
            return subtract(a, b)

        case "*":
            return multiply(a, b)

        case "/":
            return divide(a, b)

        default:
            return undefined;
    }
}


function evaluateExpression() {
    let tmpExpr = inputExpr
    tmpExpr.replaceAll(" ", "")
let result = tmpExpr.match(/\d+\.*\d*/).join("")
    tmpExpr = tmpExpr.slice(result.length)
    while (tmpExpr.length > 0) {
        let subOperator = tmpExpr.match(/[+\-*/]{1}/).join("")
        let secOperand = tmpExpr.match(/\d+\.*\d*/).join("")
        tmpExpr = tmpExpr.slice(subOperator.length + secOperand.length)
        result = operate(+result, +secOperand, subOperator)
    }

    console.log(`${inputExpr} = ${result}`)
    return result

}