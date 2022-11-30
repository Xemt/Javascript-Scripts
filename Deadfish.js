// Made By Xemt On Github
var input = prompt("Deadfish code? ")
if (input) {
 if (input.includes(" ")) {
  input = input.split("")
  for (let index = 0; index !== input.length; index++) {
   if (input[index].match(/(\t|\r|\n|\h|\v\R\ )/g)) {
    input = input.join("")
    input[index] = ""
    input = input.split(" ")
   }
  }
  input = input.join("")
 }
 for (let index = 0; index !== input.length; index++) {
  console.log(input)
 }
}
