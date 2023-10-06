let textArea = document.querySelector("#result");
let output = "";
let result = 0;

function updateInput(input) {
  if (
    input === "C" ||
    ((input === "+" || input === "*" || input === "/") && output === "")
  ) {
    output = "";
    result = 0;
  } else {
    output += input;
  }
  textArea.value = output;
}

let expressionDelimiter = /([+\-*/])/;
let decimal = /\d+/;

function calculate() { 
  let splicedEquation = spliceEquation(output);
  // check for invalid equation
  for(let i=0; i<splicedEquation.length-2; i++) {
    if((expressionDelimiter.test(splicedEquation[i]) === true) && (splicedEquation[i+1] === "")) {
      textArea.value = "Invalid Equation";
      return;
    }
  }

  // set result to first initial number
  if(decimal.test(splicedEquation[0]) === true)
    result = parseInt(splicedEquation[0]);

  for(let i=1; i<splicedEquation.length; i++) {
    if(decimal.test(splicedEquation[i+1]) === true) {
      if(splicedEquation[i] === "+")
        result += parseInt(splicedEquation[i+1]);
      else if(splicedEquation[i] === "-")
        result -= parseInt(splicedEquation[i+1]);
      else if(splicedEquation[i] === "*")
        result *= parseInt(splicedEquation[i+1]);
      else if(splicedEquation[i] === "/")
        result /= parseInt(splicedEquation[i+1]);
    }
  }
  output = result;
  textArea.value = output;
}

function spliceEquation(output) {
  let expressionParts = output.split(expressionDelimiter);
  console.log(expressionParts);
  return expressionParts;
}