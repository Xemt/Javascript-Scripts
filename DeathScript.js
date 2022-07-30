// Made by Xemt on Github 😃😃
// Made to work in the Scriptable app
var a = 0 // First DS Variable
var b = 0 // Second DS Variable
var c = 0 // Third DS Variable
var i = 0
async function interpret() {
 var tm = new Timer()
 tm.repeats = false
 tm.timeInterval = 400 // Make it wait before restarting
 var input = new Alert()
 input.title = "Input? (a is " + a + ", b is " + b + ", and c is " + c + ")"
 input.addTextField()
 input.addAction("OK")
 input.addCancelAction("Cancel")
 var idx = await input.present()
 if (idx === 0) {
  var iv = input.textFieldValue()
  var arg = iv.split(" ")
  var cmd = arg[0]
  if (cmd === "output") {
    i = 1
    while (i !== arg.length) {
     console.log(arg[i])
     i++
    }
   }
  if (cmd === "outvar") {
   if (arg[1] === "a") { console.log(a) }
   if (arg[1] === "b") { console.log(b) }
   if (arg[1] === "c") { console.log(c) }
  }
  if (cmd === "input") {
   if (arg[1] === "a") { 
    i = 2
    while (i !== arg.length) {
     var tot = tot + arg[i] + " "
     if (tot.includes("undefined")) { tot = arg[i] + " "}
     i++
    }
    a = tot
   }
   if (arg[1] === "b") { 
    i = 2
    while (i !== arg.length) {
     var tot = tot + arg[i] + " "
     if (tot.includes("undefined")) { tot = arg[i] + " " }
      i++
     }
     b = tot
   }
   if (arg[1] === "c") { 
    i = 2
    while (i !== arg.length) {
     var tot = tot + arg[i] + " "
     if (tot.includes("undefined")) { tot = arg[i] + " " }
      i++
     }
     c = tot
   }
  }
  if (cmd === "set") {
   if (arg[1] === "a") { a = Math.floor(Math.random() * 32768) }
   if (arg[1] === "b") { b = Math.floor(Math.random() * 32768) }
   if (arg[1] === "c") { c = Math.floor(Math.random() * 32768) }
  }
  if (cmd === "math") {
   if (arg[1] === "add") {
    a = b + c
   }
   if (arg[1] === "sub") {
    a = b - c
   }
   if (arg[1] === "mul") {
    a = b * c
   }
   if (arg[1] === "div") {
    a = b / c
   }
  }
  if (cmd === "switch") {
   if (arg[1] === "a") {
    console.error("Cannot swap variable 'a' with self")
   }
   if (arg[1] === "b") {
    var cur = new Map()
    cur.set("cura", a)
    a = b
    b = cur.get("cura")
   }
   if (arg[1] === "c") {
    var cur = new Map()
    cur.set("cura", a)
    a = c
    c = cur.get("cura")
   }
  }
  function restart() {
   interpret()
  }
  tm.schedule(restart)
 } else {
  console.log("Cancelled")
 }
}
interpret()
