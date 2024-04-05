/**
 * @author Xemt <https://github.com/Xemt/>.
 * @description 7/28/22 - 4/5/24. This won't get updated.
 *
 * MIT License
 * 
 * Copyright (c) 2024 Xemt
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the 
 * rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
*/

"use strict";

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
  tm.schedule(interpret)
 } else {
  log("Cancelled")
 }
}
interpret()
