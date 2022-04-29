const copyToClickBoard = (id) => {
// get the text from the DOM Element:
navigator.clipboard.writeText(document.getElementById(id).innerHTML)
console.log(document.getElementById(id))
}
