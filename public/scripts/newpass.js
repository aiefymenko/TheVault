// hiding alert when loading the page
$(document).ready(function() {
  $('.alert').hide()


const nymbers = "0123456789";
const symbols = "!@#$%^&*_+=?.,><|";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let password = "";
// getting the value of our slider
let passwordLength = document.getElementById("slider").value;
const generate = document.getElementById("generate");
const copy = document.getElementById("copy");


// Add eventlistener on click at generate ID
generate.addEventListener('click', () => {
    $('.alert').hide();
    console.log("event triggered")

});



  // $('.toast').toast();

});
