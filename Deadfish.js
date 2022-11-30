// Made By Xemt On Github
var input = prompt("Deadfish code? ")
if (input) {
 for (let index = 0; index !== input.length; index++) {
  if (input.includes(" ")) {
   input = input.replace(" ", "")
  }
  console.log(input)
 }
}
