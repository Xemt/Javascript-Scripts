// some code originally from "https://esolangs.org/wiki/Deadfish#HTML_.3F_Javascript"
// Also this thing was made by Xemt on Github 😃😃
// Made to work in the Scriptable app
var val = 0;
var i = 0
async function interpret() {
 var input = new Alert()
 input.title = "Input?"
 input.addTextField()
 input.addAction("OK")
 await input.present()
 var a = input.textFieldValue()
 while (a.includes(" ")) {
  a = a.replace(" ", "")
 } // In case you accidentally put a space (or spaces) 😃
 while (i != a.length) {
  ach = a.charAt(i)
  if(ach=='i'||ach=='I') {
   val++
  } 
  if(ach=='d'||ach=='D') { 
   val-- 
  }
  if(ach=='s'||ach == 'S') { 
   val *= val
  }
  if(ach=='o'||ach == 'O') { 
    var ascii = String.fromCharCode(val)
    console.log(val + ", or " + ascii)
  }
  if (ach != 'i' && ach != 'I' && ach != 'd' && ach != 'D' && ach != 's' && ach != 'S' && ach != 'o' && ach != 'O') {
   console.error("Unknown Command '" + ach + "'")
  }
  i++
 }
}
interpret()
