// Made By Xemt On Github
var input = prompt("Deadfish code? ")
if (input) {
 let accumulator = 0
 while (input.includes(" ")) {
  input = input.replace(" ", "")
 }
 for (let index = 0; index !== input.length; index++) {
  if (accumulator > 255 || accumulator < 0) {
   accumulator = 0
  }
 }
}
