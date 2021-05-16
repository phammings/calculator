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

let operatorBtns = document.querySelector(".operators");

let decimalBtn = document.querySelector(".decimal");
let equalBtn = document.querySelector(".evaluate");

let numDigits = 0;

allClearBtn.addEventListener("click", () => {
  numDigits = 0;
  decimalBtn.value = "true";
  displayNumber.innerHTML = "0.";
  indexCount = 0;
});

deleteBtn.addEventListener("click", () => {
  displayNumber.innerHTML = displayNumber.innerHTML.slice(
    0,
    displayNumber.innerHTML.length - 1
  );
  numDigits--;
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
  displayNumber.innerHTML =
    "0.0" + displayNumber.innerHTML.slice(0, displayNumber.innerHTML.length);
  numDigits++;
});

numberBtns.forEach((numberBtns) => {
  numberBtns.addEventListener("click", () => {
    if (displayNumber.innerHTML === "0") {
      displayNumber.innerHTML = "";
    }
    if (numDigits < 13) {
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

String.prototype.replaceAt = function (index, replacement) {
  if (displayNumber.innerHTML.slice(index, 1) === "0") {
    return replacement + ".";
  }
  if (decimalBtn.value === "true") {
    return displayNumber.innerHTML.slice(index, numDigits) + replacement + ".";
  }
  return displayNumber.innerHTML.slice(index, numDigits) + replacement;
};

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
    case add:
      return add(num1, num2);
    case subtract:
      return subtract(num1, num2);
    case multiply:
      return multiply(num1, num2);
    case divide:
      return divide(num1, num2);
    default:
      break;
  }
}
