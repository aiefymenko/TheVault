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
    let checkedNumber = document.getElementById("number").checked;
    let checkedUpperCase = document.getElementById("upper").checked;
    let checkedLowerCase = document.getElementById("lower").checked;
    let checkedSymbol = document.getElementById("symbol").checked;

    if (checkedNumber) {
      finalPassword += numbers;
      // console.log(finalPassword);
    }
    if (checkedUpperCase) {
      finalPassword += upperCase;
      // console.log(finalPassword);
    }
    if (checkedLowerCase) {
      finalPassword += lowerCase;
      // console.log(finalPassword);
    }
    if (checkedSymbol) {
      finalPassword += symbols;
      // console.log(finalPassword);
    }
    if (finalPassword !== "") {
      console.log(passwordLength.value);
      for (let i = 0; i < passwordLength.value; i++) {

      }
    }


});



  // $('.toast').toast();

});
