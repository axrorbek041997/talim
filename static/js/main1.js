var language = document.getElementById("language");
var img = document.getElementById('DDimg');
var languageText = document.getElementById('languageText');
var DDmenu = document.getElementById('DDmenu');
var uz = document.getElementById('uz');
var en = document.getElementById('en');
language.onclick = function() {
    if (DDmenu.classList != "DDactive") {
        DDmenu.classList.add("DDactive");
        img.style.transform = "rotate(180deg)";
    } else {
        DDmenu.classList.remove("DDactive");
        img.style.transform = "rotate(0)";
    }
}
en.onclick = function() {
    if (DDmenu.classList != "DDactive") {
        DDmenu.classList.add("DDactive");
        img.style.transform = "rotate(180deg)";
    } else {
        DDmenu.classList.remove("DDactive");
        img.style.transform = "rotate(0)";
    }
    languageText.innerText = this.innerText;
}
uz.onclick = function() {
    if (DDmenu.classList != "DDactive") {
        DDmenu.classList.add("DDactive");
        img.style.transform = "rotate(180deg)";
    } else {
        DDmenu.classList.remove("DDactive");
        img.style.transform = "rotate(0)";
    }
    languageText.innerText = this.innerText;
}

var body = document.getElementsByTagName("BODY")[0];
var menu = document.getElementsByClassName("header")[0];
var output = document.getElementsByClassName("menu")[0];
var input = document.getElementsByClassName("exit")[0];
var mask = document.getElementsByClassName("mask")[0];
output.onclick = function() {
    menu.style.right = "0";
    body.style.overflowY = "hidden";
    this.style.display = "none";
    input.style.display = "block";

}
input.onclick = function() {
    menu.style.right = "-100%";
    body.style.overflowY = "auto";
    this.style.display = "none";
    output.style.display = "block";
}

var enter = document.getElementsByClassName('enter')[0];
if (enter) {
enter.onclick = function() {
    document.getElementById('loginbox').style.display = 'flex';
    document.getElementsByTagName("BODY")[0].style.overflowY = "hidden";
}
}

//var user_kirish = document.getElementsByClassName('user-kirish');
//user_kirish.onclick = function() {
//    document.getElementById('loginbox').style.display = 'flex';
//    document.getElementsByTagName("BODY")[0].style.overflowY = "hidden";
//}




document.getElementById('show').onclick = function() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
        this.style.color = "#182026";
    } else {
        x.type = "password";
        this.style.color = "#5C7080";
    }
}
document.getElementById('showS').onclick = function() {
    var x = document.getElementById("passwordS");
    if (x.type === "password") {
        x.type = "text";
        this.style.color = "#182026";
    } else {
        x.type = "password";
        this.style.color = "#5C7080";
    }
}
var kirish = document.getElementById('kirish');
var inputLogin = document.getElementsByClassName('inputLogin');
var required = document.getElementsByClassName('required');

kirish.onclick = function() {
    for (var i = 0; i < inputLogin.length; i++) {
        if (inputLogin[i].value === "") {
            inputLogin[i].style.borderColor = "red";
            required[i].style.display = "block";
        }
    }
}
for (var i = 0; i < inputLogin.length; i++) {
    inputLogin[i].addEventListener('click', function() {
        if (this.style.borderColor === "red") {
            this.style.borderColor = "#E1E8ED";
            this.nextElementSibling.style.display = "none";
        }
    });
}
var send = document.getElementById('send');
var inputSignup = document.getElementsByClassName('inputSignup');
var requiredS = document.getElementsByClassName('requiredS');
var exitsms = document.getElementsByClassName('smsverification')[0];
//send.onclick = function() {
//    var t = true;
//    for (var i = 0; i < inputSignup.length; i++) {
//        if (inputSignup[i].value === "") {
//            inputSignup[i].style.borderColor = "red";
//            requiredS[i].style.display = "block";
//            t = false;
//        }
////        if (inputSignup[i].value != "") {
////
////        }
//    }
//
//    if (t) {
//        document.getElementById('loginbox').style.display = 'none';
//        exitsms.style.display = "flex";
//    }
//}
for (var i = 0; i < inputSignup.length; i++) {
    inputSignup[i].addEventListener('click', function() {
        if (this.style.borderColor === "red") {
            this.style.borderColor = "#E1E8ED";
            this.nextElementSibling.style.display = "none";
        }
    });
}
var select = document.getElementsByClassName('select1');
for (var i = 0; i < select.length; i++) {
    select[i].addEventListener('change', function() {
        if (this.value) {
            this.style.color = "#182026";
        } else {
            this.style.color = "#5C7080";
        }
    });
}

var gosignup = document.getElementById('gosignup');
var gologin = document.getElementById('gologin');
var login = document.getElementsByClassName('login')[0];
var signup = document.getElementsByClassName('signup')[0];
var input1 = document.getElementsByClassName('input1');
gosignup.onclick = function() {
    login.style.display = "none";
    signup.style.display = "block";
    for (var i = 0; i < required.length; i++) {
        if (required[i].style.display === "block") {
            required[i].style.display = "none";
            inputLogin[i].style.borderColor = "#E1E8ED";
        }
    }
}
gologin.onclick = function() {
    login.style.display = "block";
    signup.style.display = "none";
    for (var i = 0; i < inputSignup.length; i++) {
        if (inputSignup[i].style.borderColor === "red") {
            inputSignup[i].style.borderColor = "#E1E8ED";
            requiredS[i].style.display = "none";
        }
    }
    for (var i = 0; i < input1.length; i++) {
        input1[i].value = "";
    }
}

var x = document.getElementsByClassName('x');
for (var i = 0; i < x.length; i++) {
    x[i].addEventListener('click', function() {
        document.getElementById('loginbox').style.display = 'none';
        document.getElementsByTagName("BODY")[0].style.overflowY = "auto";
        login.style.display = "block";
        signup.style.display = "none";
        for (var i = 0; i < input1.length; i++) {
            input1[i].value = "";
        }
        for (var i = 0; i < required.length; i++) {
            if (required[i].style.display === "block") {
                required[i].style.display = "none";
                inputLogin[i].style.borderColor = "#E1E8ED";
            }
        }
        for (var i = 0; i < inputSignup.length; i++) {
            if (inputSignup[i].style.borderColor === "red") {
                inputSignup[i].style.borderColor = "#E1E8ED";
                requiredS[i].style.display = "none";
            }
        }
    });
}




const form = document.getElementById('form');
const inputs = form.querySelectorAll('input');
const KEYBOARDS = {
    backspace: 8,
    arrowLeft: 37,
    arrowRight: 39,
}

function handleInput(e) {
    const input = e.target
    const nextInput = input.nextElementSibling
    if (nextInput && input.value) {
        nextInput.focus()
        if (nextInput.value) {
            nextInput.select()
        }
    }
}

function handlePaste(e) {
    e.preventDefault()
    const paste = e.clipboardData.getData('text')
    inputs.forEach((input, i) => {
        input.value = paste[i] || ''
    })
}

function handleBackspace(e) {
    const input = e.target
    if (input.value) {
        input.value = ''
        return
    }

    input.previousElementSibling.focus()
}

function handleArrowLeft(e) {
    const previousInput = e.target.previousElementSibling
    if (!previousInput) return
    previousInput.focus()
}

function handleArrowRight(e) {
    const nextInput = e.target.nextElementSibling
    if (!nextInput) return
    nextInput.focus()
}

form.addEventListener('input', handleInput)
inputs[0].addEventListener('paste', handlePaste)

inputs.forEach(input => {
    input.addEventListener('focus', e => {
        setTimeout(() => {
            e.target.select()
        }, 0)
    })

    input.addEventListener('keydown', e => {
        switch (e.keyCode) {
            case KEYBOARDS.backspace:
                handleBackspace(e)
                break
            case KEYBOARDS.arrowLeft:
                handleArrowLeft(e)
                break
            case KEYBOARDS.arrowRight:
                handleArrowRight(e)
                break
            default:
        }
    })
})

document.getElementsByClassName('back')[0].onclick = function() {
    document.getElementById('loginbox').style.display = 'flex';
    exitsms.style.display = "none";
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}
document.getElementById('gologin2').onclick = function() {
    document.getElementById('loginbox').style.display = 'flex';
    document.getElementsByTagName("BODY")[0].style.overflowY = "hidden";
    login.style.display = "block";
    signup.style.display = "none";
    exitsms.style.display = "none";
    for (var i = 0; i < input1.length; i++) {
        input1[i].value = "";
    }
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}
let timerOn = true;

function timer(remaining) {
    var m = Math.floor(remaining / 60);
    var s = remaining % 60;

    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    document.getElementById('timer').innerHTML = m + ':' + s;
    remaining -= 1;

    if (remaining >= 0 && timerOn) {
        setTimeout(function() {
            timer(remaining);
        }, 1000);
        return;
    }

    if (!timerOn) {
        // Do validate stuff here
        return;
    }

    // Do timeout stuff here
    document.getElementById('restartcode').style.display = "block";
    document.getElementById('timer').style.display = "none";
}
timer(120);
document.getElementsByClassName('smsExit')[0].onclick = function() {
    exitsms.style.display = "none";
    login.style.display = "block";
    signup.style.display = "none";
}