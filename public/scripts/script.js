$(document).ready(function() {
  $('.alert').hide()


const password_ele = document.getElementById("pwd_txt");
let string = "";
const special_chars = "!@#$%^&*_?><.,`'";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const generate = document.getElementById("generate");
const clipboard = document.getElementById("clipboard");
let pwd_length = document.getElementById("slider");


generate.addEventListener('click', () => {
    $('.alert').hide();
    let password = "";
    let checkedSymbols = document.getElementById("checkbox_symbols").checked;
    let checkedUpperCase = document.getElementById("checkbox_uppercase").checked;
    let checkedLowerCase = document.getElementById("checkbox_lowercase").checked;
    let checkedNumbers = document.getElementById("checkbox_numbers").checked;
    let final_string = string;
    if (checkedSymbols) {
        final_string += special_chars;
    }
    if (checkedUpperCase) {
      final_string += upperCase;
    }
    if (checkedLowerCase) {
      final_string += lowerCase;
    }
    if (checkedNumbers) {
      final_string += numbers;
    }
    if (final_string !== "") {
      for (let i = 0; i < pwd_length.value; i++) {
        let pwd = final_string[Math.floor(Math.random() * final_string.length)];
        password += pwd;
    }
    password_ele.innerText = password;
    final_string = string;
    }
    else {
      $('.alert').show();
    }

});


clipboard.addEventListener('click', () => {
    navigator.clipboard.writeText(password_ele.innerText);
    navigator.clipboard.readText().then(
      clipText => {
      $('.toast-body').html(password_ele.innerText)
      $('#liveToast').toast('show')
    });
});


  $('.toast').toast();

});
