// hiding alert when loading the page
$(document).ready(function() {
  $('.alert').hide()


const numbers = "0123456789";
const symbols = "!@#$%^&*_+=?.,><|";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// getting the value of our slider
let passwordLength = document.getElementById("slider").value;
const password = document.getElementById("password");
const generate = document.getElementById("generate");
const copy = document.getElementById("copy");
// checking if any of the checkboxes are checked
let checkedNumber = document.getElementById("number").checked;
let checkedUpperCase = document.getElementById("upper").checked;
let checkedLowerCase = document.getElementById("lower").checked;
let checkedSymbol = document.getElementById("symbol").checked;


// Add eventlistener on click at 'generate' ID
generate.addEventListener('click', () => {
    $('.alert').hide();
    let finalPassword = "";
    if (checkedNumber) {
      finalPassword += numbers;
      console.log(finalPassword);
    }


});



  // $('.toast').toast();

});
