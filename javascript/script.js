function loadDoc(name){
    var content = document.getElementsByClassName("content")[0];
    content.style.visibility = "visible";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        content.innerHTML = this.responseText;
        //
      }
    };
    xhttp.open("GET", name, true);
    xhttp.send();
    content.style.animation = "form-animation-in .7s";
    document.getElementsByClassName("bg")[0].className += " bg-hidden";
}

function closeWindow(){
    var content = document.getElementsByClassName("content")[0];
    content.style.animation = "form-animation-out .3s";
    document.getElementsByClassName("bg")[0].classList.remove("bg-hidden");
    setTimeout(function(){
        content.style.visibility = "hidden";
        content.innerHTML="";
    }, 300);
}

function submitLogin(){
    //window.event.preventDefault();
    closeWindow();
    //Valideaza user+parola
}

function submitSignUp(){
    //window.event.preventDefault();
    closeWindow();
    //Valideaza user+parola
}