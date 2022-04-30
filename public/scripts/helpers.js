const copyUsernameToClickBoard = (id) => {
  const copyText = document.getElementById(id).innerHTML;
// get the text from the DOM Element:
navigator.clipboard.writeText(copyText);
  /* Alert the copied text */
navigator.clipboard.readText().then(
    clipText => alert("Copied: " + clipText));
}

const copyPasswordToClickBoard = (id) => {
  const copyText = document.getElementById(id).innerHTML;
  // get the text from the DOM Element:
  navigator.clipboard.writeText(copyText);
    /* Alert the copied text */
    navigator.clipboard.readText().then(
      clipText => alert("Copied: " + clipText));
  }
