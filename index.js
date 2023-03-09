//Darkmode Setup
let lightMode = true;
//Cookies Setup
console.log("THE COOKIE IS:",document.cookie);

//cookie for first-time-user
if ( document.cookie == "" ){
    document.cookie = "lightMode=true; expires=Thu, 1 Jan 2026 12:00:00 UTC";
    console.log("User had no cookie");
}

//if cookie set: change local variable to cookie
else if ( document.cookie.includes("lightMode=true") ){
    console.log("User had lightmode");
}
else if ( document.cookie.includes("lightMode=false") ){
    console.log("User had darkmode");
    //set website to dark
    lightMode = false;
    document.cookie = "lightMode=false; expires=Thu, 1 Jan 2026 12:00:00 UTC"; 
    console.log("Dark triggered");
    (document.getElementById("inner")).classList.add("darkmode-inner");
    (document.getElementById("body")).classList.add("darkmode-body");
    (document.getElementById("mode-toggle")).classList.add("darkmode-fontcolor-forced");
    (document.getElementById("mode-toggle")).classList.add("darkmode-button-hover");
    let buttons = document.getElementsByClassName("button");
    for (let i=0; i < (document.getElementsByClassName("button")).length; i++ ){
        buttons[i].classList.add("darkmode-fontcolor-forced");
        buttons[i].classList.add("darkmode-button-hover");
    }
}

else{
    console.log("User had a cookie, but it was unexpected... Something's wrong here");
}


//Darkmode Function
function toggleMode(){
    console.log("MODE CHANGE TOGGLED");
    if (lightMode) {
        lightMode = false;
        document.cookie = "lightMode=false; expires=Thu, 1 Jan 2026 12:00:00 UTC"; 
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
        document.cookie = "lightMode=true; expires=Thu, 1 Jan 2026 12:00:00 UTC";
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
    return document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .reduce((accumulator, [key,value]) =>
        ({...accumulator, [key.trim()]: decodeURIComponent(value)}),
        {});
}

