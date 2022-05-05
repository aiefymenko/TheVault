// hiding alert when loading the page
$(document).ready(function() {
  $('.alert').hide()


const numbers = "0123456789";
const symbols = "!@#$%^&*_+=?.,><|";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// getting the value of our slider
let passwordLength = document.getElementById("slider");
const password = document.getElementById("password");
const generate = document.getElementById("generate");
const copy = document.getElementById("copy");




// Add eventlistener on click at 'generate' ID
generate.addEventListener('click', () => {
    $('.alert').hide();
    // checking if any of the checkboxes are checked
    let finalPassword = "";
    let passwordToPaste = "";
    let checkedNumber = document.getElementById("number").checked;
    let checkedUpperCase = document.getElementById("upper").checked;
    let checkedLowerCase = document.getElementById("lower").checked;
    let checkedSymbol = document.getElementById("symbol").checked;

    if (checkedNumber) {
      finalPassword += numbers;
    }
    if (checkedUpperCase) {
      finalPassword += upperCase;
    }
    if (checkedLowerCase) {
      finalPassword += lowerCase;
    }
    if (checkedSymbol) {
      finalPassword += symbols;
    }
    if (finalPassword !== "") {
      for (let i = 0; i < passwordLength.value; i++) {
        // generating the password using criteria
        passwordToPaste += finalPassword.charAt(Math.floor(Math.random() * finalPassword.length));
      }
      password.innerHTML = passwordToPaste.replace(/</g,'&lt;');
      finalPassword = "";
    } else {
      $('.alert').show();
    }

});

// copy password when clipboard clicked
copy.addEventListener('click', () => {
  // check the password field to avoid copy anything other than password
  if (password.innerHTML !== "Here is your password") {
    navigator.clipboard.writeText(password.innerHTML);
    navigator.clipboard.readText().then(
      clipText => {
      $('#liveToast').toast('show');
    });
  }
});

});
