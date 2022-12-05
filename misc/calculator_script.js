"use strict";
var stringValue = "";
var cosmeticValue="";
function addNumToStr (value,cosmetic){
    stringValue += value
    cosmeticValue += cosmetic
    if ( stringValue.length > 13 ) {
        calculateStr()
    }
    document.getElementById("result").innerHTML=cosmeticValue
}
function removeChar(){
    stringValue = stringValue.slice(0, stringValue.length - 1)
    cosmeticValue = cosmeticValue.slice(0, cosmeticValue.length - 1)
    if ( stringValue == "" ) {
        document.getElementById("result").innerHTML="0"
    }
    else {
        document.getElementById("result").innerHTML=cosmeticValue
    }

}
function clearStr (){
    stringValue = ""
    cosmeticValue = ""
    document.getElementById("result").innerHTML="0"
}
function calculateStr (){
    let solution = eval(stringValue);
    console.log("Solution:",solution,"StringValue:",stringValue)
    if ( (stringValue.length > 13 || String(solution).length > 13) ) {
        solution = solution.toExponential(2)
        console.log("Solution:",solution,"StringValue:",stringValue,"New solution:",solution)
    }
    //else {
    //    const roundAccurately = (number, decimalPlaces) => Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces)
    //    roundAccurately(, 4)
    //}
    stringValue = String(solution)
    cosmeticValue = String(solution)
    
    document.getElementById("result").innerHTML=solution
    if ( isNaN(solution) || solution == "Infinity" || solution == "-Infinity" || solution == undefined ) {
        solution = ""
        stringValue = solution
        cosmeticValue = solution
    }
}

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
    }

    switch (event.key) {
    case "(":addNumToStr('(','(');break;
    case ")":addNumToStr(')',')');break;
    case "Backspace":removeChar();break;
    case "/":addNumToStr('/','÷');break;

    case "7":addNumToStr('7','7');break;
    case "8":addNumToStr('8','8');break;
    case "9":addNumToStr('9','9');break;
    case "*":addNumToStr('*','×');break;

    case "4":addNumToStr('4','4');break;
    case "5":addNumToStr('5','5');break;
    case "6":addNumToStr('6','6');break;
    case "-":addNumToStr('-','−');break;

    case "1":addNumToStr('1','1');break;
    case "2":addNumToStr('2','2');break;
    case "3":addNumToStr('3','3');break;
    case "+":addNumToStr('+','+');break;

    case "Escape":clearStr();break;
    case "0":addNumToStr('0','0');break;
    case ".":addNumToStr('.','.');break;
    case "Enter":calculateStr();break;
    
    default:
        return;
    }
    event.preventDefault();
}, true);