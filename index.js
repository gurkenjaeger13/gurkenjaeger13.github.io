//Darkmode Setup
let lightMode = true;
//Cookies Setup
console.log("THE COOKIE IS:",document.cookie);

//cookie for first-time-user
if ( document.cookie == "" ){
    document.cookie = "lightMode=true";
    console.log("user had no cookie");
}

//if cookie set: change local variable to cookie
if ( document.cookie == "lightMode=true"){
    console.log("User had lightmode");
}
if ( document.cookie == "lightMode=false"){
    console.log("User had darkmode");
    //set website to dark
    lightMode = false;
    document.cookie = "lightMode=false"; 
    console.log("Dark triggered");
    (document.getElementById("inner")).classList.add("darkmode-inner");
    (document.getElementById("body")).classList.add("darkmode-body");
    (document.getElementById("mode-toggle")).classList.add("darkmode-fontcolor-forced");
    (document.getElementById("mode-toggle")).classList.add("darkmode-button-hover");
    let buttons = document.getElementsByClassName("button");
    for (let i=0; i < (document.getElementsByClassName("button")).length; i++ ){
        buttons[i].classList.add("darkmode-fontcolor-forced");
        buttons[i].classList.add("darkmode-button-hover");}
}

//Darkmode Function
function toggleMode(){
    console.log("MODE CHANGE TOGGLED");
    if (lightMode) {
        lightMode = false;
        document.cookie = "lightMode=false"; 
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
        document.cookie = "lightMode=true";
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


//Cookie
function getCookie(){
    document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .reduce((accumulator, [key,value]) =>
        ({...accumulator, [key.trim()]: decodeURIComponent(value)}),
        {});
}

