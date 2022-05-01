const copyUsernameToClickBoard = (id) => {
// get the text from the DOM Element:
navigator.clipboard.writeText(document.getElementById(id).innerHTML)
}

const copyPasswordToClickBoard = (id) => {
  // get the text from the DOM Element:
  navigator.clipboard.writeText(document.getElementById(id).innerHTML)
  }
