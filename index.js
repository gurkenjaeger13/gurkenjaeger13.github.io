//darkmode
let lightMode = true;
let modeElements = [];
modeElements.push();
modeElements.push();
console.log


function toggleMode(){
    
    if (lightMode) {
        lightMode = false;
        console.log("Dark triggered");
        (document.getElementById("inner")).classList.add("darkmode-inner");
        (document.getElementById("body")).classList.add("darkmode-body");
        (document.getElementById("mode-toggle")).classList.add("darkmode-fontcolor-forced");
        (document.getElementById("mode-toggle")).classList.add("darkmode-button-hover");
        let buttons = document.getElementsByClassName("button");
        for (let i=0; i < (document.getElementsByClassName("button")).length; i++ ){
            buttons[i].classList.add("darkmode-fontcolor-forced");
            buttons[i].classList.add("darkmode-button-hover");}
        return;
    }

    else{
        lightMode = true;
        console.log("Light triggered");
        (document.getElementById("inner")).classList.remove("darkmode-inner");
        (document.getElementById("body")).classList.remove("darkmode-body");
        (document.getElementById("mode-toggle")).classList.remove("darkmode-fontcolor-forced");
        (document.getElementById("mode-toggle")).classList.remove("darkmode-button-hover");
        let buttons = document.getElementsByClassName("button");
        for (let i=0; i < (document.getElementsByClassName("button")).length; i++ ){
            buttons[i].classList.remove("darkmode-fontcolor-forced");
            buttons[i].classList.remove("darkmode-button-hover");}
        return;
    }


}

