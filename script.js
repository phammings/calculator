document.addEventListener("DOMContentLoaded", (event) => {
  document.documentElement.setAttribute("data-theme", "light");

  let themeSwitcher = document.getElementById("theme-switcher");
  themeSwitcher.checked = true;

  themeSwitcher.onclick = () => {
    let currentTheme = document.documentElement.getAttribute("data-theme");
    let switchToTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", switchToTheme);
  };
});

let displayNumber = document.querySelector("#current-value");
let numberBtns = document.querySelectorAll(".numbers");

let allClearBtn = document.querySelector("#all-clear");
let deleteBtn = document.querySelector("#delete");
let plusMinusBtn = document.querySelector("#plus-minus");
let percentBtn = document.querySelector("#percent");

let operatorBtns = document.querySelectorAll(".operators");

let decimalBtn = document.querySelector(".decimal");
let equalBtn = document.querySelector(".evaluate");

let minusIcon = document.querySelector("#minus");
let plusIcon = document.querySelector("#plus");
let divideIcon = document.querySelector("#divide");
let timesIcon = document.querySelector("#times");

let numDigits = 0;
let operator = "";
let operand = "0";
let result = "0";
let isOperating = false;
let canChangeOperator = false;

function resetIcons() {
  plusIcon.style.setProperty("--opacity-level", 0.2);
  minusIcon.style.setProperty("--opacity-level", 0.2);
  timesIcon.style.setProperty("--opacity-level", 0.2);
  divideIcon.style.setProperty("--opacity-level", 0.2);
}

function lightUpIcon(operator) {
  resetIcons();
  switch (operator) {
    case "+":
      plusIcon.style.setProperty("--opacity-level", 0.8);
      break;
    case "-":
      minusIcon.style.setProperty("--opacity-level", 0.8);
      break;
    case "*":
      timesIcon.style.setProperty("--opacity-level", 0.8);
      break;
    case "/":
      divideIcon.style.setProperty("--opacity-level", 0.8);
      break;
    default:
      break;
  }
}

operatorBtns.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", () => {
    if (displayNumber.innerHTML === "0.") {
      displayError();
    } else if (canChangeOperator) {
      operator = operatorBtn.innerHTML;
      lightUpIcon(operator);
    } else {
      calculate();
      operator = operatorBtn.innerHTML;
      lightUpIcon(operator);
      canChangeOperator = true;
    }
  });
});

equalBtn.addEventListener("click", () => {
  if (operator === "") {
    displayError();
  } else {
    calculate();
    operator = "";
    resetIcons();
  }
});

function calculate() {
  if (operator === "") {
    operand = displayNumber.innerHTML;
  } else {
    result =
      "" +
      roundResult(
        operate(
          operator,
          parseFloat(operand),
          parseFloat(displayNumber.innerHTML)
        )
      );
    operand = result;
    displayNumber.innerHTML = result;
    if (result % 1 === 0) {
      displayNumber.innerHTML += ".";
    }
  }
  isOperating = true;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

allClearBtn.addEventListener("click", () => {
  resetCalculator();
  resetIcons();
  operand = "0";
  result = "0";
  operator = "";
});

deleteBtn.addEventListener("click", () => {
  if (
    decimalBtn.value === "true" &&
    !(
      displayNumber.innerHTML.slice(
        displayNumber.innerHTML.length - 1,
        displayNumber.innerHTML.length
      ) === "."
    )
  ) {
    displayNumber.innerHTML =
      displayNumber.innerHTML.slice(0, displayNumber.innerHTML.length - 2) +
      ".";
  }

  if (
    decimalBtn.value === "true" &&
    displayNumber.innerHTML.slice(
      displayNumber.innerHTML.length - 1,
      displayNumber.innerHTML.length
    ) === "."
  ) {
    displayNumber.innerHTML =
      displayNumber.innerHTML.slice(0, displayNumber.innerHTML.length - 2) +
      ".";
  }

  if (decimalBtn.value === "false") {
    if (
      displayNumber.innerHTML.slice(
        displayNumber.innerHTML.length - 1,
        displayNumber.innerHTML.length
      ) === "."
    ) {
      decimalBtn.value = "true";
    } else {
      displayNumber.innerHTML = displayNumber.innerHTML.slice(
        0,
        displayNumber.innerHTML.length - 1
      );
    }
  }

  if (displayNumber.innerHTML.length === 1) {
    displayNumber.innerHTML = "0.";
    decimalBtn.value === "true";
  }
  if (numDigits > 0) {
    numDigits--;
  }
});

plusMinusBtn.addEventListener("click", () => {
  if (plusMinusBtn.value === "true") {
    displayNumber.innerHTML =
      "-" + displayNumber.innerHTML.slice(0, displayNumber.innerHTML.length);
    numDigits++;
    plusMinusBtn.value = "false";
  } else {
    displayNumber.innerHTML = displayNumber.innerHTML.slice(
      1,
      displayNumber.innerHTML.length
    );
    numDigits--;
    plusMinusBtn.value = "true";
  }
});

percentBtn.addEventListener("click", () => {
  if (
    displayNumber.innerHTML.slice(
      displayNumber.innerHTML.length - 1,
      displayNumber.innerHTML.length
    ) != "."
  ) {
    displayNumber.innerHTML =
      "" +
      parseFloat(
        displayNumber.innerHTML.slice(0, displayNumber.innerHTML.length)
      ) /
        100;

    numDigits++;
    decimalBtn.value = "false";
  }
  if (
    displayNumber.innerHTML.slice(
      displayNumber.innerHTML.length - 1,
      displayNumber.innerHTML.length
    ) === "." &&
    displayNumber.innerHTML != "0." &&
    displayNumber.innerHTML != "0"
  ) {
    displayNumber.innerHTML =
      "" +
      parseFloat(
        displayNumber.innerHTML.slice(0, displayNumber.innerHTML.length - 1)
      ) /
        100;

    numDigits++;
    decimalBtn.value = "false";
  }
  if (displayNumber.innerHTML.length > 14) {
    displayNumber.innerHTML = parseFloat(displayNumber.innerHTML).toFixed(12);
  }
  if (displayNumber.innerHTML === "0.000000000000") {
    displayNumber.innerHTML = "NUMBER 2 BIG";
    setTimeout(function () {
      resetCalculator();
    }, 500);
  }
});

numberBtns.forEach((numberBtns) => {
  numberBtns.addEventListener("click", () => {
    if (isOperating) {
      resetCalculator();
      displayNumber.innerHTML = numberBtns.innerHTML + ".";
      isOperating = false;
      plusMinusBtn.value = "true";
      canChangeOperator = false;
    }
    if (displayNumber.innerHTML === "0") {
      displayNumber.innerHTML = "";
    }
    if (numDigits < 13 && !isOperating) {
      displayNumber.innerHTML = displayNumber.innerHTML.replaceAt(
        0,
        numberBtns.innerHTML
      );
      numDigits++;
    }
  });

  decimalBtn.addEventListener("click", () => {
    if (numDigits < 13) {
      if (decimalBtn.value === "true") {
        decimalBtn.value = "false";
        numDigits++;
      }
    }
  });
});

function displayError() {
  displayNumber.innerHTML = "ERROR";
  setTimeout(function () {
    resetCalculator();
  }, 500);
}

String.prototype.replaceAt = function (index, replacement) {
  if (decimalBtn.value === "false") {
    return displayNumber.innerHTML.slice(index, numDigits) + replacement;
  }
  if (displayNumber.innerHTML.slice(index, 1) === "0") {
    return replacement + ".";
  }
  if (decimalBtn.value === "true") {
    return displayNumber.innerHTML.slice(index, numDigits) + replacement + ".";
  }
  return displayNumber.innerHTML.slice(index, numDigits) + replacement;
};

function resetCalculator() {
  numDigits = 0;
  decimalBtn.value = "true";
  displayNumber.innerHTML = "0.";
  indexCount = 0;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      break;
  }
}
